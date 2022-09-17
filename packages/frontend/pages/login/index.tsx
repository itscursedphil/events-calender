import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { LoginResponseData, LoginSuccessResponseData } from '../api/login';
import useCurrentUserStore from '../../hooks/useCurrentUser';
import { useRouter } from 'next/router';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Bitte gib eine korrekte E-Mail Adresse ein')
    .required('Bitte gib eine E-Mail Adresse ein'),
  password: Yup.string().required('Bitte gib ein Passwort ein'),
});

const useLogin = (): [
  (
    identifier: string,
    password: string
  ) => Promise<LoginSuccessResponseData['user'] | null>,
  { loading: boolean }
] => {
  const [loading, setLoading] = useState(false);

  const login = async (identifier: string, password: string) => {
    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data: LoginResponseData = await res.json();

    setLoading(false);

    // TODO: Handle error case

    if (res.ok && data.state === 'success') {
      return data.user;
    }

    return null;
  };

  return [login, { loading }];
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [login, { loading }] = useLogin();
  const setUser = useCurrentUserStore((state) => state.setUser);

  // TODO: Improve
  const handleFormSubmit = async (values: LoginFormValues) => {
    const user = await login(values.email, values.password);

    if (user) {
      setUser({
        id: user.id,
        email: user.email || '',
        username: user.username,
      });
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Heading as="h2" size="lg">
        Login
      </Heading>
      <Box mt={6}>
        <Formik<LoginFormValues>
          initialValues={initialFormValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form noValidate>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={touched.email && !!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" type="email" />
                  <ErrorMessage component={FormErrorMessage} name="email" />
                </FormControl>
                <FormControl isInvalid={touched.password && !!errors.password}>
                  <FormLabel>Passwort</FormLabel>
                  <Field as={Input} name="password" type="password" />
                  <ErrorMessage component={FormErrorMessage} name="password" />
                </FormControl>
                <Button type="submit" disabled={loading || !dirty || !isValid}>
                  Anmelden
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default LoginPage;
