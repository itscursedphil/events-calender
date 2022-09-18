import React, { useState } from 'react';
import { FiClock, FiMapPin } from 'react-icons/fi';
import {
  Badge,
  Box,
  Divider,
  Heading,
  Icon,
  Link,
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
import { sortEventsByDay } from '../../lib/sort';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  doorsTime?: string;
}

interface Venue {
  id: string;
  name: string;
  description?: string;
  website?: string;
}

interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

interface UpcomingEvent
  extends Pick<
    Event,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'doorsTime'
  > {
  category: Pick<EventCategory, 'id' | 'name' | 'slug'>;
  venue: Pick<Venue, 'id' | 'name'>;
}

const mapUpcomingEventsQueryResults = (data?: UpcomingEventsQuery) =>
  (data?.events?.data || []).map<UpcomingEvent>((event) => ({
    id: event.id as string,
    title: event.attributes?.title as string,
    description: event.attributes?.description as string,
    startDate: event.attributes?.startDate,
    endDate: event.attributes?.endDate,
    doorsTime: event.attributes?.doorsTime,
    venue: {
      id: event.attributes?.venue?.data?.id as string,
      name: event.attributes?.venue?.data?.attributes?.name as string,
    },
    category: {
      id: event.attributes?.category?.data?.id as string,
      name: event.attributes?.category?.data?.attributes?.name as string,
      slug: event.attributes?.category?.data?.attributes?.slug as string,
    },
  }));

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

const createSlugFromString = (str: string, id: string) => {
  const parsedStr = str
    .split(' ')
    .map((part) => part.replace(/[^A-Za-z0-9]/g, ''))
    .join('-')
    .toLowerCase();

  return `${parsedStr}-${id}`;
};

const EventItemHeader: React.FC<Pick<UpcomingEvent, 'title' | 'category'>> = ({
  title,
  category,
}) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
    <Heading as="h3" size="md">
      {title}
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
  <Box>
    <EventItemHeader {...event} />
    <EventItemMeta {...event} />
    <Divider mt={4} mb={2} />
  </Box>
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
      <Box mt={6}>
        {eventsByDay.map(({ date, events: eventsForDay }) => (
          <Box key={date} mb={8}>
            <Text mb={4}>{dayjs(date).format('dddd, D. MMMM')}</Text>
            <Stack>
              {eventsForDay.map((event) => (
                <EventItem {...event} key={event.id} />
              ))}
            </Stack>
          </Box>
        ))}
        {!loading && !events.length && <Text>Leider keine Ergebnisse</Text>}
      </Box>
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
