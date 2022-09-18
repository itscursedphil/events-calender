import React from 'react';
import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { EventStartDateWithIcon } from '../../components/Event';
import { VenueLinkWithIcon } from '../../components/Venue';
import {
  EventDocument,
  EventPathsDocument,
  EventPathsQuery,
  EventPathsQueryVariables,
  EventQuery,
  EventQueryVariables,
} from '../../generated/graphql';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';
import { Event, mapEventQueryResult } from '../../lib/event';
import { createSlugFromString, getIdFromSlug } from '../../lib/slug';

const EventPage: NextPage<Event> = ({
  title,
  description,
  startDate,
  venue,
  category,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Box mb={2}>
      <Badge>{category.name}</Badge>
    </Box>
    <Heading as="h2" size="lg">
      {title}
    </Heading>
    <Box my={4}>
      <Stack spacing={2}>
        <EventStartDateWithIcon startDate={startDate} />
        <VenueLinkWithIcon {...venue} />
      </Stack>
    </Box>
    <Text>{description}</Text>
  </>
);

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const apolloClient = createApolloClient();

  try {
    const startDate = dayjs().subtract(30, 'days');

    const { data } = await apolloClient.query<
      EventPathsQuery,
      EventPathsQueryVariables
    >({
      query: EventPathsDocument,
      variables: {
        limit: 100,
        startDate,
      },
    });

    if (!data.events?.data) throw new Error('Error fetching event paths');

    const slugs = data.events?.data
      .map((event) => {
        if (!event.id || !event.attributes?.title) return '';

        return createSlugFromString(event.attributes.title, event.id);
      })
      .filter((val) => !!val);

    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<Event, { slug: string }> = async (
  ctx
) => {
  const apolloClient = createApolloClient();

  const id = getIdFromSlug(ctx.params?.slug || '');

  const { data } = await apolloClient.query<EventQuery, EventQueryVariables>({
    query: EventDocument,
    variables: {
      id,
    },
  });

  const eventData = data.event?.data;

  if (!eventData) {
    throw new Error('Error fetching event');
  }

  const event = mapEventQueryResult<typeof eventData, Event>(eventData);

  return {
    ...addApolloState(apolloClient, {
      props: event,
    }),
    // Revalidate every 60 minutes
    revalidate: 60 * 60,
  };
};

export default EventPage;
