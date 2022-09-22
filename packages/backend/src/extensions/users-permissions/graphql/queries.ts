import { Strapi } from '@strapi/strapi';

const registerGraphQlQueryExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

  const usersPermissionsMeEventsQueryExtension = (nexus) => {
    const graphqlPlugin = strapi.plugin('graphql');

    const { transformArgs, getContentTypeArgs } =
      graphqlPlugin.service('builders').utils;
    const { toEntityResponseCollection } =
      graphqlPlugin.service('format').returnTypes;

    const eventContentTypeUid = 'api::event.event';
    const eventContentType = strapi.contentTypes[eventContentTypeUid];

    // TODO: Refactor into service
    return nexus.extendType({
      type: 'UsersPermissionsMe',
      definition: (t) => {
        t.field('events', {
          type: 'EventEntityResponseCollection',
          args: getContentTypeArgs(eventContentType),
          resolve: async (root, args, ctx) => {
            const userId = ctx.state.user.id;

            const transformedArgs = transformArgs(args, {
              contentType: eventContentType,
              usePagination: true,
            });

            const [user] = await strapi.entityService.findMany(
              'plugin::users-permissions.user',
              {
                filters: {
                  id: userId,
                },
                populate: {
                  events: transformedArgs,
                },
              }
            );

            const { events } = user;

            return toEntityResponseCollection(events, {
              args: transformedArgs,
              resourceUID: eventContentTypeUid,
            });
          },
        });
      },
    });
  };

  extensionService.use(({ nexus }) => ({
    types: [usersPermissionsMeEventsQueryExtension(nexus)],
  }));
};

export default registerGraphQlQueryExtensions;
