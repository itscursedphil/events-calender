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
import { registerFormValidationSchema } from '../../lib/validation';
import {
  RegisterResponseData,
  RegisterSuccessResponseData,
} from '../../pages/api/register';

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
};

const useRegister = (): [
  (
    values: RegisterFormValues
  ) => Promise<RegisterSuccessResponseData['user'] | null>,
  { loading: boolean }
] => {
  const [loading, setLoading] = useState(false);

  const register = async (values: RegisterFormValues) => {
    try {
      setLoading(true);

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data: RegisterResponseData = await res.json();

      setLoading(false);

      if (res.ok && data.state === 'success') {
        return data.user;
      }

      return null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setLoading(false);
      return null;
    }
  };

  return [register, { loading }];
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [register, { loading }] = useRegister();
  const setUser = useCurrentUserStore((state) => state.setUser);

  // TODO: Improve
  const handleSubmit = async (values: RegisterFormValues) => {
    const user = await register(values);

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
    <Formik<RegisterFormValues>
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={registerFormValidationSchema}
    >
      {({ values, touched, errors, dirty, isValid }) => {
        const passwordsMatch = values.password === values.passwordRepeat;
        return (
          <Form noValidate>
            <Stack spacing={4} align="stretch">
              <FormControl isInvalid={touched.username && !!errors.username}>
                <FormLabel>Username</FormLabel>
                <Field as={Input} name="username" type="text" />
                <ErrorMessage component={FormErrorMessage} name="username" />
              </FormControl>
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
              <FormControl
                isInvalid={touched.passwordRepeat && !passwordsMatch}
              >
                <FormLabel>Passwort wiederholen</FormLabel>
                <Field as={Input} name="passwordRepeat" type="password" />
                {touched.passwordRepeat && !passwordsMatch && (
                  <FormErrorMessage>
                    Deine Passwörter stimmen nicht überein
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                disabled={loading || !dirty || !isValid || !passwordsMatch}
              >
                Registrieren
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
