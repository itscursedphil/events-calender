import React, { useState } from 'react';
import { Box, Heading, Select, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { UpcomingEventsList } from '../../components/Event';
import { UpcomingEvent } from '../../components/Event/UpcomingEventsList';
import {
  EventCategoriesDocument,
  EventCategoriesQuery,
  UpcomingEventsDocument,
  UpcomingEventsQuery,
  UpcomingEventsQueryVariables,
  useEventCategoriesQuery,
  useUpcomingEventsQuery,
} from '../../generated/graphql';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';
import { mapEventQueryResult } from '../../lib/event';

const mapUpcomingEventsQueryResults = (data?: UpcomingEventsQuery) =>
  (data?.events?.data || []).map((event) =>
    mapEventQueryResult<typeof event, UpcomingEvent>(event)
  );

const EventCategoryDropdown: React.FC<{
  onChange?: (categoryId: string) => void;
}> = ({ onChange }) => {
  const { data } = useEventCategoriesQuery();

  const categories =
    data?.eventCategories?.data.map((category) => ({
      id: category.id || '',
      ...category.attributes,
    })) || [];

  return (
    <Select
      placeholder="Alle Kategorien"
      onChange={(e) => onChange && onChange(e.currentTarget.value)}
    >
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

const EventsPage: NextPage = () => {
  const [categoryFilterId, setCategoryFilterId] = useState<string | null>(null);
  const { data, previousData, loading } = useUpcomingEventsQuery({
    variables: {
      from: 0,
      limit: 10,
      startDate: dayjs().startOf('day').toISOString(),
      categories: categoryFilterId ? [categoryFilterId] : undefined,
    },
  });

  const events = mapUpcomingEventsQueryResults(data || previousData);

  return (
    <>
      <Head>
        <title>Veranstaltungen</title>
      </Head>
      <Heading as="h2" size="lg">
        Nächste Veranstaltungen
      </Heading>
      <Box mt={4}>
        <Stack>
          <EventCategoryDropdown onChange={setCategoryFilterId} />
        </Stack>
      </Box>
      <UpcomingEventsList events={events} />
      {!loading && !events.length && (
        <Text>Leider keine nächsten Veranstaltungen</Text>
      )}
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

    const fetchUpcomingEvents = () => {
      const startDate = dayjs().startOf('day').toISOString();

      return apolloClient.query<
        UpcomingEventsQuery,
        UpcomingEventsQueryVariables
      >({
        query: UpcomingEventsDocument,
        variables: {
          from: 0,
          limit: 10,
          startDate,
        },
      });
    };

    await Promise.all([fetchUpcomingEvents(), fetchEventCategories()]);

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
