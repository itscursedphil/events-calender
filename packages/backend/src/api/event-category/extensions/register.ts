import { Strapi } from '@strapi/strapi';

import registerGraphQlShadowCrudExtensions from './graphql/shadowCrud';

// eslint-disable-next-line import/prefer-default-export
const registerExtensions = (strapi: Strapi) => {
  registerGraphQlShadowCrudExtensions(strapi);
};

export default registerExtensions;
