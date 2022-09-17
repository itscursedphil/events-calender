import React from 'react';
import { Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

import { useCurrentUserQuery, useEventsQuery } from '../../generated/graphql';

const EventsPage: NextPage = () => {
  useEventsQuery();
  useCurrentUserQuery();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Heading as="h2" size="lg">
        Events
      </Heading>
    </>
  );
};

export default EventsPage;
