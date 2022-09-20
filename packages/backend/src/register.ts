import { Strapi } from '@strapi/strapi';
import { EntityService } from '@strapi/strapi/lib/services/entity-service';

// eslint-disable-next-line import/prefer-default-export
export const registerGraphQlCustomizations = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

  // Event
  extensionService.shadowCRUD('api::event.event').field('attendees').disable();
  extensionService
    .shadowCRUD('api::event.event')
    .field('publishedAt')
    .disable();

  // Event category
  extensionService
    .shadowCRUD('api::event-category.event-category')
    .field('createdAt')
    .disable();
  extensionService
    .shadowCRUD('api::event-category.event-category')
    .field('updatedAt')
    .disable();
  extensionService
    .shadowCRUD('api::event-category.event-category')
    .field('publishedAt')
    .disable();

  // TODO: Move logic into service
  const queryUserIsAttendingEvent = async (eventId: string, userId: string) => {
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
  };

  // TODO: Move logic into service
  const eventTypeAttendeesCountQueryExtension = (nexus) =>
    nexus.extendType({
      type: 'Event',
      definition: (t) => {
        t.field('attendeesCount', {
          type: 'Int',
          resolve: async ({ id }, args, ctx) => {
            const {
              attendees: { count: attendeesCount = 0 },
            } = await (strapi.entityService as EntityService).findOne(
              'api::event.event',
              id,
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
        });
      },
    });

  // TODO: Move logic into service
  const eventTypeAttendingQueryExtension = (nexus) =>
    nexus.extendType({
      type: 'Event',
      definition: (t) => {
        t.field('attending', {
          type: 'Boolean',
          resolve: async ({ id }, args, ctx) => {
            if (!ctx?.state?.isAuthenticated || !ctx?.state?.user) return false;

            const userId = ctx.state.user.id;

            const isAttending = await queryUserIsAttendingEvent(id, userId);

            return isAttending;
          },
        });
      },
    });

  // TODO: Move logic into service
  const updateEventAttendingMutationExtension = (nexus) =>
    nexus.mutationField('updateEventAttending', {
      type: 'Boolean',
      args: {
        id: nexus.nonNull(nexus.idArg()),
        attending: nexus.nonNull(nexus.booleanArg()),
      },
      resolve: async (root, args, ctx) => {
        const { id, attending } = args;

        const { id: userId } = ctx.state.user;

        const previousIsAttending = await queryUserIsAttendingEvent(id, userId);

        if (attending === previousIsAttending) {
          return true;
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
              [eventAttendeesRelationEventIdColumnKey]: id,
              [eventAttendeesRelationUserIdColumnKey]: userId,
            });
        } else {
          await (strapi.db as any)
            .connection(eventAttendeesRelationTableName)
            .where({
              [eventAttendeesRelationEventIdColumnKey]: id,
              [eventAttendeesRelationUserIdColumnKey]: userId,
            })
            .del();
        }

        return true;
      },
    });

  const updateEventAttendingResolversConfig = {
    'Mutation.updateEventAttending': {
      auth: true,
    },
  };

  extensionService.use(({ nexus }) => ({
    types: [
      eventTypeAttendeesCountQueryExtension(nexus),
      eventTypeAttendingQueryExtension(nexus),
      updateEventAttendingMutationExtension(nexus),
    ],
    resolversConfig: {
      ...updateEventAttendingResolversConfig,
    },
  }));
};
