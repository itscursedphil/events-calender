import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import {
  EventsAttendeesCountsQuery,
  UpcomingEventsQuery,
  useEventsAttendeesCountsQuery,
  useUpcomingEventsQuery,
} from '../generated/graphql';
import { Event, EventCategory, mapEventQueryResult } from '../lib/event';
import { Venue } from '../lib/venue';

export interface EventsListEvent
  extends Pick<
    Event,
    | 'id'
    | 'title'
    | 'description'
    | 'startDate'
    | 'endDate'
    | 'doorsTime'
    | 'attendeesCount'
  > {
  category: Pick<EventCategory, 'id' | 'name' | 'slug'>;
  venue: Pick<Venue, 'id' | 'name'>;
}

// TODO: Fetch event attendees count client side

const mapEventsQueryResults = (
  data?: UpcomingEventsQuery,
  attendeesCountsData?: EventsAttendeesCountsQuery
) =>
  (data?.events?.data || []).map((eventResult) => {
    const event = mapEventQueryResult<typeof eventResult, EventsListEvent>(
      eventResult
    );

    const eventAtteendeesCount = (attendeesCountsData?.events?.data || []).find(
      (eventAttendeesCountResult) => eventAttendeesCountResult.id === event.id
    );

    return {
      ...event,
      attendeesCount: eventAtteendeesCount?.attributes?.attendeesCount || 0,
    };
  });

const useEventsList = ({
  categories,
  venues,
  limit = 20,
}: {
  categories?: string[];
  venues?: string[];
  limit?: number;
}): {
  events: EventsListEvent[];
  total: number;
  isLoading: boolean;
  attendeesCountsIsLoading: boolean;
  hasMore: boolean;
  handleFetchMore: () => Promise<void>;
} => {
  const [nextOffset, setNextOffset] = useState(limit);
  const {
    data,
    previousData,
    loading: isLoading,
    fetchMore,
  } = useUpcomingEventsQuery({
    variables: {
      from: 0,
      limit,
      startDate: dayjs().startOf('day').toISOString(),
      categories,
      venues,
    },
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: attendeesCountsData,
    fetchMore: fetchMoreAttendeesCounts,
    loading: attendeesCountsIsLoading,
  } = useEventsAttendeesCountsQuery({
    variables: {
      from: 0,
      limit,
      startDate: dayjs().startOf('day').toISOString(),
      categories,
      venues,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { total = 0 } = data?.events?.meta.pagination || {};
  const hasMore = nextOffset < total;

  const handleFetchMore = useCallback(async () => {
    if (hasMore && !isLoading) {
      await Promise.all([
        fetchMore({ variables: { from: nextOffset } }),
        fetchMoreAttendeesCounts({ variables: { from: nextOffset } }),
      ]);
      setNextOffset(nextOffset + limit);
    }
  }, [
    hasMore,
    isLoading,
    fetchMore,
    nextOffset,
    fetchMoreAttendeesCounts,
    limit,
  ]);

  const events = useMemo(
    () => mapEventsQueryResults(data || previousData, attendeesCountsData),
    [attendeesCountsData, data, previousData]
  );

  const categoriesId = JSON.stringify(categories);
  const venuesId = JSON.stringify(venues);

  useEffect(() => {
    setNextOffset(limit);
  }, [categoriesId, venuesId, limit]);

  return {
    events,
    isLoading,
    attendeesCountsIsLoading,
    total,
    hasMore,
    handleFetchMore,
  };
};

export default useEventsList;
