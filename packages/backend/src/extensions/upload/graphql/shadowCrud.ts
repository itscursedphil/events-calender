import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  const extensionService = strapi.plugin('graphql').service('extension');
  const uploadFilePluginShadowCrudExtensionService =
    extensionService.shadowCRUD('plugin::upload.file');
  const uploadFolderPluginShadowCrudExtensionService =
    extensionService.shadowCRUD('plugin::upload.folder');

  uploadFilePluginShadowCrudExtensionService.disableMutations();
  uploadFolderPluginShadowCrudExtensionService.disableMutations();
};

export default registerGraphQlShadowCrudExtensions;
