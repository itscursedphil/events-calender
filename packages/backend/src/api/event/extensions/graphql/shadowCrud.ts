import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

  extensionService.shadowCRUD('api::event.event').field('attendees').disable();
  extensionService
    .shadowCRUD('api::event.event')
    .field('publishedAt')
    .disable();
};

export default registerGraphQlShadowCrudExtensions;
