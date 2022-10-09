import React, { useEffect, useRef } from 'react';
import {
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

import { useEventCategoriesQuery } from '../../generated/graphql';
import { EventsListEvent } from '../../hooks/useEventsList';
import { createSlugFromString } from '../../lib/slug';
import { sortEventsByDay } from '../../lib/sort';
import { VenueLinkWithIcon } from '../Venue';
import EventAttendeesCountWithIcon from './EventAttendeesCountWithIcon';
import EventCategoryBadge from './EventCategoryBadge';
import EventStartDateWithIcon from './EventStartDateWithIcon';

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
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="flex-start"
    mb={4}
  >
    <Heading as="h3" size="md" mr={2}>
      <NextLink href={`/events/${createSlugFromString(title, id)}`} passHref>
        <LinkOverlay>{title}</LinkOverlay>
      </NextLink>
    </Heading>
    <Box display="inline-flex" mt={1}>
      <EventCategoryBadge {...category} />
    </Box>
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
