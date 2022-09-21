import { Strapi } from '@strapi/strapi';

const registerGraphQlQueryExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

  // TODO: Decide on final query property name
  const eventTypeAttendeesCountQueryExtension = (nexus) =>
    nexus.extendType({
      type: 'Event',
      definition: (t) => {
        t.field('attendeesCount', {
          type: 'Int',
          resolve: ({ id }, args, ctx) =>
            strapi.service('api::event.event').attendingCount(id),
        });
      },
    });

  const eventTypeAttendingQueryExtension = (nexus) =>
    nexus.extendType({
      type: 'Event',
      definition: (t) => {
        t.field('attending', {
          type: 'Boolean',
          resolve: async ({ id }, args, ctx) => {
            if (!ctx?.state?.isAuthenticated || !ctx?.state?.user) return false;

            const userId = ctx.state.user.id;

            const isAttending = await strapi
              .service('api::event.event')
              .isUserAttending(id, userId);

            return isAttending;
          },
        });
      },
    });

  extensionService.use(({ nexus }) => ({
    types: [
      eventTypeAttendeesCountQueryExtension(nexus),
      eventTypeAttendingQueryExtension(nexus),
    ],
  }));
};

export default registerGraphQlQueryExtensions;
