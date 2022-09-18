import React from 'react';
import { FiClock } from 'react-icons/fi';
import { Icon, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Event } from '../../lib/event';

const EventStartDateWithIcon: React.FC<Pick<Event, 'startDate'>> = ({
  startDate,
}) => (
  <Stack direction="row" align="center" spacing={1}>
    <Icon as={FiClock} />
    <Text as="span" fontSize="sm">
      {dayjs(startDate).format('H:mm')}
    </Text>
  </Stack>
);

export default EventStartDateWithIcon;
