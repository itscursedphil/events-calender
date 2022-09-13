import { Container, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';

const RegisterPage: NextPage = () => (
  <div>
    <Head>
      <title>Register - Events Calender</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <Header />
      <Main>
        <Heading as="h2" size="lg">
          Register
        </Heading>
      </Main>
    </Container>
  </div>
);

export default RegisterPage;
