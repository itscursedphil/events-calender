import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Badge,
  Box,
  Divider,
  Heading,
  LinkBox,
  LinkOverlay,
  Select,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';

import {
  EventsAttendeesCountsQuery,
  UpcomingEventsQuery,
  useEventCategoriesQuery,
  useEventsAttendeesCountsQuery,
  useUpcomingEventsQuery,
} from '../../generated/graphql';
import { Event, EventCategory, mapEventQueryResult } from '../../lib/event';
import { createSlugFromString } from '../../lib/slug';
import { sortEventsByDay } from '../../lib/sort';
import { Venue } from '../../lib/venue';
import { VenueLinkWithIcon } from '../Venue';
import EventAttendeesCountWithIcon from './EventAttendeesCountWithIcon';
import EventStartDateWithIcon from './EventStartDateWithIcon';

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

export const useEventsList = ({
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

const EventsListItemHeader: React.FC<
  Pick<EventsListEvent, 'title' | 'category' | 'id'>
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

const EventsListItemMeta: React.FC<
  Pick<EventsListEvent, 'startDate' | 'venue' | 'attendeesCount'> & {
    attendeesCountIsLoading?: boolean;
  }
> = ({ startDate, venue, attendeesCount, attendeesCountIsLoading }) => (
  <Box display="flex" justifyContent="space-between">
    <Stack direction="row" spacing={4}>
      <EventStartDateWithIcon startDate={startDate} />
      <VenueLinkWithIcon {...venue} />
    </Stack>
    <EventAttendeesCountWithIcon
      count={attendeesCount}
      isLoading={attendeesCountIsLoading}
    />
  </Box>
);

const EventsListItem: React.FC<
  EventsListEvent & {
    attendeesCountIsLoading?: boolean;
  }
> = ({ attendeesCountIsLoading, ...event }) => (
  <LinkBox>
    <EventsListItemHeader {...event} />
    <EventsListItemMeta
      {...event}
      attendeesCountIsLoading={attendeesCountIsLoading}
    />
  </LinkBox>
);

// TODO: Load event attendees count client side instead of server side
const EventsList: React.FC<{
  events: EventsListEvent[];
  isEmpty?: boolean;
  attendeesCountsIsLoading?: boolean;
  showSkeleton?: boolean;
  onCategoryChange?: (id: string) => void;
  onSkeletonIntersecting?: () => void;
}> = ({
  events,
  isEmpty,
  attendeesCountsIsLoading,
  showSkeleton,
  onCategoryChange,
  onSkeletonIntersecting,
}) => {
  const eventsByDay = sortEventsByDay(events);

  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onSkeletonIntersecting) {
      const currentSkeletonRef = skeletonRef.current;

      const observer = new window.IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry && entry.isIntersecting) {
            onSkeletonIntersecting();
          }
        },
        { rootMargin: `0px 0px ${window.innerHeight}px 0px` }
      );

      if (currentSkeletonRef) {
        observer.observe(currentSkeletonRef);
      }

      return () => {
        if (currentSkeletonRef) observer.unobserve(currentSkeletonRef);
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [onSkeletonIntersecting]);

  return (
    <Box>
      <Stack>
        <EventCategoryDropdown onChange={onCategoryChange} />
      </Stack>
      <Stack spacing={12} mt={6}>
        {eventsByDay.map(({ date, events: eventsForDay }) => (
          <Box key={date}>
            <Text>{dayjs(date).format('dddd, D. MMMM')}</Text>
            <Divider my={4} />
            <Stack divider={<Divider />} spacing={4}>
              {eventsForDay.map((event) => (
                <EventsListItem
                  {...event}
                  attendeesCountIsLoading={attendeesCountsIsLoading}
                  key={event.id}
                />
              ))}
            </Stack>
          </Box>
        ))}
        <div ref={skeletonRef}>
          {showSkeleton && (
            <Stack spacing={4}>
              <Skeleton>
                <Text size="md">Mehr laden</Text>
              </Skeleton>
              <Skeleton>
                <Text>Mehr laden</Text>
              </Skeleton>
            </Stack>
          )}
        </div>
      </Stack>
      {isEmpty && <Text>Leider keine Ergebnisse</Text>}
    </Box>
  );
};

export default EventsList;
