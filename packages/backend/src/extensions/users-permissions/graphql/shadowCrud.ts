import { Strapi } from '@strapi/strapi';

const registerGraphQlShadowCrudExtensions = (strapi: Strapi) => {
  // console.log(strapi.contentTypes);

  const extensionService = strapi.plugin('graphql').service('extension');
  const usersPermissionsUserPluginShadowCrudExtensionService =
    extensionService.shadowCRUD('plugin::users-permissions.user');
  const usersPermissionsRolePluginShadowCrudExtensionService =
    extensionService.shadowCRUD('plugin::users-permissions.role');
  const usersPermissionsPermissionPluginShadowCrudExtensionService =
    extensionService.shadowCRUD('plugin::users-permissions.permission');

  usersPermissionsUserPluginShadowCrudExtensionService.disableActions([
    'delete',
  ]);
  usersPermissionsRolePluginShadowCrudExtensionService.disableMutations();
  usersPermissionsPermissionPluginShadowCrudExtensionService.disableMutations();
};

export default registerGraphQlShadowCrudExtensions;
