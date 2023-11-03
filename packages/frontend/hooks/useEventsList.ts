import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import {
  UpcomingEventsQuery,
  useUpcomingEventsQuery,
} from '../generated/graphql';
import { Event, EventCategory, mapEventQueryResult } from '../lib/event';
import { Venue } from '../lib/venue';

export interface EventsListEvent
  extends Pick<
    Event,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'doorsTime'
  > {
  category: Pick<EventCategory, 'id' | 'name' | 'slug'>;
  venue: Pick<Venue, 'id' | 'name'>;
}

// TODO: Fetch event attendees count client side

const mapEventsQueryResults = (data?: UpcomingEventsQuery) =>
  (data?.events?.data || []).map((eventResult) =>
    mapEventQueryResult<typeof eventResult, EventsListEvent>(eventResult)
  );

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

  const { total = 0 } = data?.events?.meta.pagination || {};
  const hasMore = nextOffset < total;

  const handleFetchMore = useCallback(async () => {
    if (hasMore && !isLoading) {
      await fetchMore({ variables: { from: nextOffset } });
      setNextOffset(nextOffset + limit);
    }
  }, [hasMore, isLoading, fetchMore, nextOffset, limit]);

  const events = useMemo(
    () => mapEventsQueryResults(data || previousData),
    [data, previousData]
  );

  const categoriesId = JSON.stringify(categories);
  const venuesId = JSON.stringify(venues);

  useEffect(() => {
    setNextOffset(limit);
  }, [categoriesId, venuesId, limit]);

  return {
    events,
    isLoading,
    total,
    hasMore,
    handleFetchMore,
  };
};

export default useEventsList;
