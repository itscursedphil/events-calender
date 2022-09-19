import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

import { RegisterForm } from '../../components/Register';

const RegisterPage: NextPage = () => (
  <>
    <Head>
      <title>Registrieren</title>
    </Head>
    <Heading as="h2" size="lg">
      Registrieren
    </Heading>
    <Box mt={6}>
      <RegisterForm />
    </Box>
  </>
);

export default RegisterPage;
