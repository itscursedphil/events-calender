import { Strapi } from '@strapi/strapi';

const registerGraphQlMutationExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

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

        await strapi
          .service('api::event.event')
          .updateUserAttending(id, userId, attending);

        return true;
      },
    });

  const updateEventAttendingResolversConfig = {
    'Mutation.updateEventAttending': {
      auth: true,
    },
  };

  extensionService.use(({ nexus }) => ({
    types: [updateEventAttendingMutationExtension(nexus)],
    resolversConfig: {
      ...updateEventAttendingResolversConfig,
    },
  }));
};

export default registerGraphQlMutationExtensions;
