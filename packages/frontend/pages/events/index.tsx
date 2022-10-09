import React, { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { EventsList } from '../../components/Event';
import { useEventsList } from '../../components/Event/EventsList';
import {
  EventCategoriesDocument,
  EventCategoriesQuery,
  UpcomingEventsDocument,
  UpcomingEventsQuery,
  UpcomingEventsQueryVariables,
} from '../../generated/graphql';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';

const FETCH_EVENTS_LIMIT = 20;

const EventsPage: NextPage = () => {
  const [categoryFilterId, setCategoryFilterId] = useState<string | null>(null);
  const { events, isLoading, hasMore, handleFetchMore } = useEventsList({
    categories: categoryFilterId ? [categoryFilterId] : undefined,
    limit: FETCH_EVENTS_LIMIT,
  });

  return (
    <>
      <Head>
        <title>Veranstaltungen</title>
      </Head>
      <Heading as="h2" size="lg">
        Nächste Veranstaltungen
      </Heading>
      <Box mt={4}>
        <EventsList
          events={events}
          isEmpty={!isLoading && !events.length}
          showSkeleton={hasMore}
          onCategoryChange={(id) => {
            setCategoryFilterId(id);
          }}
          onSkeletonIntersecting={handleFetchMore}
        />
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Revalidate every 10 minutes
  const revalidate = 10 * 60;

  try {
    const apolloClient = createApolloClient();

    const fetchEventCategories = () =>
      apolloClient.query<EventCategoriesQuery>({
        query: EventCategoriesDocument,
      });

    const fetchEvents = () => {
      const startDate = dayjs().startOf('day').toISOString();

      return apolloClient.query<
        UpcomingEventsQuery,
        UpcomingEventsQueryVariables
      >({
        query: UpcomingEventsDocument,
        variables: {
          from: 0,
          limit: FETCH_EVENTS_LIMIT,
          startDate,
        },
      });
    };

    await Promise.all([fetchEvents(), fetchEventCategories()]);

    return {
      ...addApolloState(apolloClient, {
        props: {},
      }),
      revalidate,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return {
      props: { events: [] },
      revalidate,
    };
  }
};

export default EventsPage;
