import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

const EventAddPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Event erstellen</title>
      </Head>
      <Heading as="h2" size="lg">
        Event erstellen
      </Heading>
      <Box mt={4}>Lorem</Box>
    </>
  );
};

export default EventAddPage;
