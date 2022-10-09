import React, { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { Box, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import EventsList, {
  EventsListEvent,
  useEventsList,
} from '../../components/Event/EventsList';
import {
  UpcomingEventsDocument,
  UpcomingEventsQuery,
  UpcomingEventsQueryVariables,
  VenueDocument,
  VenuePathsDocument,
  VenuePathsQuery,
  VenuePathsQueryVariables,
  VenueQuery,
  VenueQueryVariables,
} from '../../generated/graphql';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';
import { mapEventQueryResult } from '../../lib/event';
import { createSlugFromString, getIdFromSlug } from '../../lib/slug';
import { mapVenueQueryResult, Venue } from '../../lib/venue';

type VenuePageProps = Venue & { events: EventsListEvent[] };

const FETCH_EVENTS_LIMIT = 20;

const VenuePage: NextPage<VenuePageProps> = ({
  id,
  name,
  description,
  address,
}) => {
  const [categoryFilterId, setCategoryFilterId] = useState<string | null>(null);
  const { events, isLoading, hasMore, handleFetchMore } = useEventsList({
    categories: categoryFilterId ? [categoryFilterId] : undefined,
    venues: [id],
    limit: FETCH_EVENTS_LIMIT,
  });

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Heading as="h2" size="lg">
        {name}
      </Heading>
      <Stack direction="row" align="flex-start" spacing={1} mt={4}>
        <Icon as={FiMapPin} />
        <Box>
          <Text fontSize="sm" mt="-0.2em">
            <strong>Adresse:</strong> <br />
            {`${address.street} ${address.streetNumber}`} <br />
            {`${address.postcode} Hannover`} <br />
          </Text>
        </Box>
      </Stack>
      <Text mt={4}>{description}</Text>
      <Heading as="h4" size="md" mt={8}>
        Nächste Veranstaltungen:
      </Heading>
      <Box mt={4}>
        <EventsList
          events={events}
          isEmpty={!isLoading && !events.length}
          showSkeleton={hasMore}
          onCategoryChange={(categoryId) => {
            setCategoryFilterId(categoryId);
          }}
          onSkeletonIntersecting={handleFetchMore}
        />
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const apolloClient = createApolloClient();

  const { data } = await apolloClient.query<
    VenuePathsQuery,
    VenuePathsQueryVariables
  >({
    query: VenuePathsDocument,
  });

  if (!data.venues?.data) throw new Error('Error fetching paths for venues');

  const paths = data.venues.data
    .map((venue) => ({
      params: {
        slug:
          venue.id && venue.attributes
            ? createSlugFromString(venue.attributes.name, venue.id || '')
            : '',
      },
    }))
    .filter((p) => !!p.params.slug);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<
  VenuePageProps,
  { slug: string }
> = async (ctx) => {
  const apolloClient = createApolloClient();

  if (!ctx.params?.slug) throw new Error('Error fetching venue page');

  const id = getIdFromSlug(ctx.params.slug);

  const fetchVenue = async () => {
    const { data } = await apolloClient.query<VenueQuery, VenueQueryVariables>({
      query: VenueDocument,
      variables: {
        id,
      },
    });

    if (!data.venue?.data?.id || !data.venue.data.attributes)
      throw new Error(`Error fetching venue page for id ${id}`);

    return mapVenueQueryResult(data.venue.data);
  };

  const fetchEvents = async () => {
    try {
      const { data } = await apolloClient.query<
        UpcomingEventsQuery,
        UpcomingEventsQueryVariables
      >({
        query: UpcomingEventsDocument,
        variables: {
          startDate: dayjs().startOf('day').toISOString(),
          venues: [id],
          limit: FETCH_EVENTS_LIMIT,
        },
      });

      if (!data.events?.data) return [];

      const events = data.events.data.map((event) =>
        mapEventQueryResult<typeof event, any>(event)
      );

      return events;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return [];
    }
  };

  const [venue, events] = await Promise.all([fetchVenue(), fetchEvents()]);

  return {
    ...addApolloState(apolloClient, { props: { ...venue, events } }),
    // Revalidate every 60 minutes
    revalidate: 60 * 60,
  };
};

export default VenuePage;
