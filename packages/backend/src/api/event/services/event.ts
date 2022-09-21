import { factories, Strapi } from '@strapi/strapi';
import { EntityService } from '@strapi/strapi/lib/services/entity-service';

/**
 * event service.
 */

// TODO: Fix typings
export default factories.createCoreService<any>(
  'api::event.event',
  ({ strapi }: { strapi: Strapi }) => ({
    attendingCount: async (eventId: string) => {
      const {
        attendees: { count: attendeesCount = 0 },
      } = await (strapi.entityService as EntityService).findOne(
        'api::event.event',
        eventId,
        {
          populate: {
            attendees: {
              count: true,
            },
          },
        }
      );

      return attendeesCount;
    },
    isUserAttending: async (eventId: string, userId: string) => {
      const { attendees = [] } = await (
        strapi.entityService as EntityService
      ).findOne('api::event.event', eventId, {
        populate: {
          attendees: {
            fields: ['id'],
            filters: { id: { $eq: userId } },
          },
        },
      });

      return !!attendees.length;
    },
    updateUserAttending: async (
      eventId: string,
      userId: string,
      attending: boolean
    ) => {
      const previousIsAttending = await strapi
        .service('api::event.event')
        .isUserAttending(eventId, userId);

      if (attending === previousIsAttending) {
        return;
      }

      const eventAttendeesRelationTableName = (strapi.db as any).metadata.get(
        'api::event.event'
      ).attributes.attendees.joinTable.name;
      const eventAttendeesRelationEventIdColumnKey = (
        strapi.db as any
      ).metadata.get('api::event.event').attributes.attendees.joinTable
        .joinColumn.name;
      const eventAttendeesRelationUserIdColumnKey = (
        strapi.db as any
      ).metadata.get('api::event.event').attributes.attendees.joinTable
        .inverseJoinColumn.name;

      if (attending) {
        await (strapi.db as any)
          .connection(eventAttendeesRelationTableName)
          .insert({
            [eventAttendeesRelationEventIdColumnKey]: eventId,
            [eventAttendeesRelationUserIdColumnKey]: userId,
          });
      } else {
        await (strapi.db as any)
          .connection(eventAttendeesRelationTableName)
          .where({
            [eventAttendeesRelationEventIdColumnKey]: eventId,
            [eventAttendeesRelationUserIdColumnKey]: userId,
          })
          .del();
      }
    },
  })
);
