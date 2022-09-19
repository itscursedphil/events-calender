import type { NextApiRequest, NextApiResponse } from 'next';

import { RegisterFormValues } from '../../components/Register/RegisterForm';
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from '../../generated/graphql';
import { createAuthCookie } from '../../lib/api';
import { createApolloClient } from '../../lib/apolloClient';
import { registerFormValidationSchema } from '../../lib/validation';

const apolloClient = createApolloClient();

export interface RegisterErrorResponseData {
  state: 'error';
  error: string;
}

export interface RegisterSuccessResponseData {
  state: 'success';
  jwt: string;
  user: RegisterMutation['register']['user'];
}

export type RegisterResponseData =
  | RegisterErrorResponseData
  | RegisterSuccessResponseData;

const registerMutation = (values: Omit<RegisterFormValues, 'passwordRepeat'>) =>
  apolloClient.mutate<RegisterMutation, RegisterMutationVariables>({
    mutation: RegisterDocument,
    variables: values,
  });

const testFormValues = async (formValues: RegisterFormValues) => {
  const dataIsValid = await registerFormValidationSchema.isValid(formValues);

  if (!dataIsValid) throw new Error('Registration data is not valid');

  return true;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formValues = req.body;

    await testFormValues(formValues);

    const { data, errors } = await registerMutation(formValues);

    if ((errors && errors.length) || !data?.register.jwt) {
      return res.status(401).json({
        state: 'error',
        error: 'Could not authenticate user',
      });
    }

    const cookie = createAuthCookie(data.register.jwt);

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({
      state: 'success',
      jwt: data.register.jwt,
      user: data.register.user,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(400).json({
      state: 'error',
      error: 'Could not register user',
    });
  }
};

export default handler;
