import React from 'react';
import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Events Calendar</title>
      </Head>
      <Heading as="h2" size="lg">
        Home
      </Heading>
    </>
  );
};

export default Home;
