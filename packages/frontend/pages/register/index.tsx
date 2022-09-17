import { Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const RegisterPage: NextPage = () => (
  <>
    <Head>
      <title>Register</title>
    </Head>
    <Heading as="h2" size="lg">
      Register
    </Heading>
  </>
);

export default RegisterPage;
