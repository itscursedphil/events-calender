import React from 'react';
import { Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

const VenuePage: NextPage = () => (
  <>
    <Head>
      <title>Venue</title>
    </Head>
    <Heading as="h2" size="lg">
      Venue
    </Heading>
  </>
);

export default VenuePage;
