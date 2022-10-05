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
  const {
    handleSubmit,
    watch,
    register: registerField,
    formState: { errors, isSubmitting, isDirty, isValid, touchedFields },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: yupResolver(registerFormValidationSchema),
  });
  const [register] = useRegister();
  const setUser = useCurrentUserStore((state) => state.setUser);

  const password = watch('password');
  const passwordRepeat = watch('passwordRepeat');

  const passwordsMatch = password === passwordRepeat;

  // TODO: Improve
  const handleFormSubmit = async (values: RegisterFormValues) => {
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
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Stack spacing={4} align="stretch">
        <FormControl isInvalid={touchedFields.username && !!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input {...registerField('username')} />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touchedFields.email && !!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...registerField('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touchedFields.password && !!errors.password}>
          <FormLabel>Passwort</FormLabel>
          <Input type="password" {...registerField('password')} />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>{' '}
        </FormControl>
        <FormControl
          isInvalid={touchedFields.passwordRepeat && !passwordsMatch}
        >
          <FormLabel>Passwort wiederholen</FormLabel>
          <Input type="password" {...registerField('passwordRepeat')} />
          {touchedFields.passwordRepeat && !passwordsMatch && (
            <FormErrorMessage>
              Deine Passwörter stimmen nicht überein
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty || !isValid || !passwordsMatch}
        >
          Registrieren
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
