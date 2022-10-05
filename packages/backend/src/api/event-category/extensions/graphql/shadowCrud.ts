import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');
  const eventCategoryShadowCrudExtensionService = extensionService.shadowCRUD(
    'api::event-category.event-category'
  );

  eventCategoryShadowCrudExtensionService.field('createdAt').disable();
  eventCategoryShadowCrudExtensionService.field('updatedAt').disable();
  eventCategoryShadowCrudExtensionService.field('publishedAt').disable();

  eventCategoryShadowCrudExtensionService.disableActions([
    'create',
    'update',
    'delete',
  ]);
};

export default registerGraphQlShadowCrudExtensions;
