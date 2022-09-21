import { Strapi } from '@strapi/strapi';

import registerGraphQlMutationExtensions from './graphql/mutations';
import registerGraphQlQueryExtensions from './graphql/queries';
import registerGraphQlShadowCrudExtensions from './graphql/shadowCrud';

// eslint-disable-next-line import/prefer-default-export
const registerExtensions = (strapi: Strapi) => {
  registerGraphQlShadowCrudExtensions(strapi);
  registerGraphQlQueryExtensions(strapi);
  registerGraphQlMutationExtensions(strapi);
};

export default registerExtensions;
