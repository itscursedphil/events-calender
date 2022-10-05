import { Strapi } from '@strapi/strapi';

import registerGraphQlShadowCrudExtensions from './graphql/shadowCrud';

const registerExtensions = (strapi: Strapi) => {
  registerGraphQlShadowCrudExtensions(strapi);
};

export default registerExtensions;
