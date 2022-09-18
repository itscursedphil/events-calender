import React, { useState } from 'react';
import { FiClock, FiMapPin } from 'react-icons/fi';
import {
  Badge,
  Box,
  Divider,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

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
import { Event, EventCategory, mapEventQueryResult } from '../../lib/event';
import { createSlugFromString } from '../../lib/slug';
import { sortEventsByDay } from '../../lib/sort';
import { Venue } from '../../lib/venue';

interface UpcomingEvent
  extends Pick<
    Event,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'doorsTime'
  > {
  category: Pick<EventCategory, 'id' | 'name' | 'slug'>;
  venue: Pick<Venue, 'id' | 'name'>;
}

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

const EventItemHeader: React.FC<
  Pick<UpcomingEvent, 'title' | 'category' | 'id'>
> = ({ id, title, category }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
    <Heading as="h3" size="md">
      <NextLink href={`/events/${createSlugFromString(title, id)}`} passHref>
        <LinkOverlay>{title}</LinkOverlay>
      </NextLink>
    </Heading>
    <Badge>{category.name}</Badge>
  </Box>
);

const EventItemMeta: React.FC<Pick<UpcomingEvent, 'startDate' | 'venue'>> = ({
  startDate,
  venue,
}) => (
  <Stack direction="row" spacing={4}>
    <Stack direction="row" align="center" spacing={1}>
      <Icon as={FiClock} />
      <Text as="span" fontSize="sm">
        {dayjs(startDate).format('H:mm')}
      </Text>
    </Stack>
    <Stack direction="row" align="center" spacing={1}>
      <Icon as={FiMapPin} />
      <Text as="span" fontSize="sm">
        <NextLink
          href={`/venues/${createSlugFromString(venue.name, venue.id)}`}
          passHref
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link>{venue.name}</Link>
        </NextLink>
      </Text>
    </Stack>
  </Stack>
);

const EventItem: React.FC<UpcomingEvent> = (event) => (
  <LinkBox>
    <EventItemHeader {...event} />
    <EventItemMeta {...event} />
  </LinkBox>
);

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
  const eventsByDay = sortEventsByDay(events);

  return (
    <>
      <Head>
        <title>Veranstaltungen</title>
      </Head>
      <Heading as="h2" size="lg">
        Kommende Veranstaltungen
      </Heading>
      <Box mt={4}>
        <Stack>
          <EventCategoryDropdown onChange={setCategoryFilterId} />
        </Stack>
      </Box>
      <Stack spacing={12} mt={6}>
        {eventsByDay.map(({ date, events: eventsForDay }) => (
          <Box key={date}>
            <Text>{dayjs(date).format('dddd, D. MMMM')}</Text>
            <Divider my={4} />
            <Stack divider={<Divider />} spacing={4}>
              {eventsForDay.map((event) => (
                <EventItem {...event} key={event.id} />
              ))}
            </Stack>
          </Box>
        ))}
        {!loading && !events.length && <Text>Leider keine Ergebnisse</Text>}
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
      // Revalidate every 10 minutes
      revalidate: 10 * 60,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return {
      props: { events: [] },
    };
  }
};

export default EventsPage;
