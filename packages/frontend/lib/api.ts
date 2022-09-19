import { serialize } from 'cookie';

import config from './config';

// TODO: Improve and set lifetime based on JWT
// TODO: Add better error handling
// TODO: Set cookie more secure in production environment
// TODO: Implement session cookie
// eslint-disable-next-line import/prefer-default-export
export const createAuthCookie = (jwt: string) =>
  serialize(config.authentication.cookie, jwt, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: '/',
  });
