import type { NextApiRequest, NextApiResponse } from 'next';
import {
  LoginMutation,
  LoginMutationVariables,
} from './../../generated/graphql';
import { createApolloClient } from './../../lib/apolloClient';
import { LoginDocument } from '../../generated/graphql';
import { serialize } from 'cookie';
import config from '../../lib/config';

export interface LoginErrorResponseData {
  state: 'error';
  error: string;
}

export interface LoginSuccessResponseData {
  state: 'success';
  jwt: string;
  user: LoginMutation['login']['user'];
}

export type LoginResponseData =
  | LoginErrorResponseData
  | LoginSuccessResponseData;

const apolloClient = createApolloClient();

const loginMutation = (identifier: string, password: string) =>
  apolloClient.mutate<LoginMutation, LoginMutationVariables>({
    mutation: LoginDocument,
    variables: {
      email: identifier,
      password,
    },
    fetchPolicy: 'network-only',
  });

// TODO: Improve and set lifetime based on JWT
// TODO: Add better error handling
// TODO: Set cookie more secure in production environment
// TODO: Implement session cookie
const createCookie = (jwt: string) =>
  serialize(config.authentication.cookie, jwt, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: '/',
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(401).json({
        state: 'error',
        error: 'Could not authenticate user',
      });
    }

    const { data, errors } = await loginMutation(identifier, password);

    if ((errors && errors.length) || !data?.login.jwt) {
      return res.status(401).json({
        state: 'error',
        error: 'Could not authenticate user',
      });
    }

    const cookie = createCookie(data.login.jwt);

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({
      state: 'success',
      jwt: data.login.jwt,
      user: data.login.user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      state: 'error',
      error: 'Could not authenticate user',
    });
  }
};

export default handler;
