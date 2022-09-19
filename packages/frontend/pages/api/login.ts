import type { NextApiRequest, NextApiResponse } from 'next';

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '../../generated/graphql';
import { createAuthCookie } from '../../lib/api';
import { createApolloClient } from '../../lib/apolloClient';

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

// TODO: Validate values based on validationSchema
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

    const cookie = createAuthCookie(data.login.jwt);

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
