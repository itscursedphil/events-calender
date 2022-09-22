import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';

import UpcomingEventsList, {
  UpcomingEvent,
} from '../../components/Event/UpcomingEventsList';
import { useCurrentUserCalendarQuery } from '../../generated/graphql';
import { mapEventQueryResult } from '../../lib/event';

const CalendarPage: NextPage = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const { data } = useCurrentUserCalendarQuery({
    skip: !startDate,
    variables: {
      startDate,
    },
  });

  useEffect(() => {
    setStartDate(dayjs().toISOString());
  }, []);

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
      {/* <Box mt={4}>
        <Stack>
          <EventCategoryDropdown onChange={setCategoryFilterId} />
        </Stack>
      </Box> */}
      <UpcomingEventsList events={events} />
      {/* {!loading && !events.length && (
        <Text>Leider keine nächsten Veranstaltungen</Text>
      )} */}
    </>
  );
};

export default CalendarPage;
