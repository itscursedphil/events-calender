import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, touchedFields },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginFormValidationSchema),
  });
  const [login] = useLogin();
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
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Stack spacing={4} align="stretch">
        <FormControl isInvalid={touchedFields.email && !!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touchedFields.password && !!errors.password}>
          <FormLabel>Passwort</FormLabel>
          <Input type="password" {...register('password')} />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Anmelden
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
