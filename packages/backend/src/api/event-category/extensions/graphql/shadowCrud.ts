import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');

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
};

export default registerGraphQlShadowCrudExtensions;
