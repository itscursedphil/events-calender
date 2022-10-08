import React, { useMemo } from 'react';
import { Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';

import EventsList, { UpcomingEvent } from '../../components/Event/EventsList';
import { useCurrentUserCalendarQuery } from '../../generated/graphql';
import { mapEventQueryResult } from '../../lib/event';

// TODO: Server render page
const CalendarPage: NextPage = () => {
  const startDate = useMemo(() => dayjs().startOf('day').toISOString(), []);
  const { data, loading } = useCurrentUserCalendarQuery({
    variables: {
      startDate,
    },
  });

  const events = (data?.me?.events?.data || []).map((event) =>
    mapEventQueryResult<typeof event, UpcomingEvent>(event)
  );

  return (
    <>
      <Head>
        <title>Kalender</title>
      </Head>
      <Heading as="h2" size="lg">
        Dein Kalender
      </Heading>
      <EventsList events={events} isEmpty={!loading && !events.length} />
    </>
  );
};

export default CalendarPage;
