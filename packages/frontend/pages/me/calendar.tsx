import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';

import EventsList, { UpcomingEvent } from '../../components/Event/EventsList';
import { useCurrentUserCalendarQuery } from '../../generated/graphql';
import { mapEventQueryResult } from '../../lib/event';

const FETCH_EVENTS_LIMIT = 20;

// TODO: Server render page
const CalendarPage: NextPage = () => {
  const [categoryFilterId, setCategoryFilterId] = useState<string | null>(null);
  const [nextOffset, setNextOffset] = useState(FETCH_EVENTS_LIMIT);
  const startDate = useMemo(() => dayjs().startOf('day').toISOString(), []);
  const {
    data,
    loading: isLoading,
    fetchMore,
  } = useCurrentUserCalendarQuery({
    variables: {
      startDate,
      limit: FETCH_EVENTS_LIMIT,
      categories: categoryFilterId ? [categoryFilterId] : undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { total = 0 } = data?.me?.events?.meta.pagination || {};
  const hasMore = nextOffset < total;

  const handleFetchMore = useCallback(async () => {
    if (hasMore && !isLoading) {
      await fetchMore({ variables: { from: nextOffset } });
      setNextOffset(nextOffset + FETCH_EVENTS_LIMIT);
    }
  }, [fetchMore, hasMore, isLoading, nextOffset]);

  useEffect(() => {
    setNextOffset(FETCH_EVENTS_LIMIT);
  }, [categoryFilterId]);

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

export default CalendarPage;
