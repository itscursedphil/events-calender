import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');
  const venueShadowCrudExtensionService =
    extensionService.shadowCRUD('api::venue.venue');
};

export default registerGraphQlShadowCrudExtensions;
