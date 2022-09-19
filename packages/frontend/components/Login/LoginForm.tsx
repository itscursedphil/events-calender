import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import useCurrentUserStore from '../../hooks/useCurrentUser';
import { loginFormValidationSchema } from '../../lib/validation';
import {
  LoginResponseData,
  LoginSuccessResponseData,
} from '../../pages/api/login';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
};

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

const LoginForm: React.FC = () => {
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
    <Formik<LoginFormValues>
      initialValues={initialFormValues}
      onSubmit={handleFormSubmit}
      validationSchema={loginFormValidationSchema}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form noValidate>
          <Stack spacing={4} align="stretch">
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
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
