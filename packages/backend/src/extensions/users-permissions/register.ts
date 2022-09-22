import { Strapi } from '@strapi/strapi';

import registerGraphQlQueryExtensions from './graphql/queries';

const registerExtensions = (strapi: Strapi) => {
  registerGraphQlQueryExtensions(strapi);
};

export default registerExtensions;
