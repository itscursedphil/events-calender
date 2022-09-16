/* eslint-disable camelcase */
/**
 * `cookie-authentication` middleware
 */

import { Strapi } from '@strapi/strapi';
import { parse } from 'cookie';

// We check if there's an authorization cookie set in the request and add the
// JWT to the headers to authenticate in the users & permissions plugin
// via cookie from the frontend
export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    if (/^\/graphql/.test(ctx.request.url) && ctx.request.method === 'POST') {
      const { events_user } = parse(ctx.get('cookie'));

      if (events_user)
        ctx.request.headers.authorization = `Bearer ${events_user}`;
    }

    await next();
  };
};
