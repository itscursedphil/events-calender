import React from 'react';
import { Box, Divider, Heading, Link, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

import { LoginForm } from '../../components/Login';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Heading as="h2" size="lg">
        Login
      </Heading>
      <Box mt={6}>
        <LoginForm />
      </Box>
      <Divider my={4} />
      <Box>
        <Text textAlign="center">
          Noch kein Account?
          <br />
          <NextLink href="/register" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link textDecor="underline">Hier registrieren</Link>
          </NextLink>
        </Text>
      </Box>
    </>
  );
};

export default LoginPage;
