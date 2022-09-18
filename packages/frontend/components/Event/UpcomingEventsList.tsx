import React from 'react';
import {
  Badge,
  Box,
  Divider,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';

import { Event, EventCategory } from '../../lib/event';
import { createSlugFromString } from '../../lib/slug';
import { sortEventsByDay } from '../../lib/sort';
import { Venue } from '../../lib/venue';
import { VenueLinkWithIcon } from '../Venue';
import EventStartDateWithIcon from './EventStartDateWithIcon';

export interface UpcomingEvent
  extends Pick<
    Event,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'doorsTime'
  > {
  category: Pick<EventCategory, 'id' | 'name' | 'slug'>;
  venue: Pick<Venue, 'id' | 'name'>;
}

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
    <EventStartDateWithIcon startDate={startDate} />
    <VenueLinkWithIcon {...venue} />
  </Stack>
);

const EventItem: React.FC<UpcomingEvent> = (event) => (
  <LinkBox>
    <EventItemHeader {...event} />
    <EventItemMeta {...event} />
  </LinkBox>
);

const UpcomingEventsList: React.FC<{ events: UpcomingEvent[] }> = ({
  events,
}) => {
  const eventsByDay = sortEventsByDay(events);

  return (
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
      {/* {!loading && !events.length && <Text>Leider keine Ergebnisse</Text>} */}
    </Stack>
  );
};

export default UpcomingEventsList;
