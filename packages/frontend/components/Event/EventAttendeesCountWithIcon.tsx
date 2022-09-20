import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Icon, Stack, Text } from '@chakra-ui/react';

const EventAttendeesCountWithIcon: React.FC<{
  count: number;
  compact?: boolean;
}> = ({ count, compact = true }) => {
  if (count < 1) return null;

  const fullMessage = `${count} Person${
    count > 1 ? 'en nehmen' : ' nimmt'
  } teil`;

  return (
    <Stack direction="row" align="center" spacing={1}>
      <Icon as={FiUser} />
      <Text as="span" fontSize="sm">
        {compact ? `${count}` : fullMessage}
      </Text>
    </Stack>
  );
};

export default EventAttendeesCountWithIcon;
