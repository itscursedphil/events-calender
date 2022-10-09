import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Icon, Skeleton, Stack, Text } from '@chakra-ui/react';

const EventAttendeesCountWithIcon: React.FC<{
  count: number;
  compact?: boolean;
  isLoading?: boolean;
  showAlways?: boolean;
}> = ({ count = 0, isLoading, showAlways, compact = true }) => {
  if (count < 1 && !isLoading && !showAlways) return null;

  const fullMessage = `${count} Person${
    count === 1 ? ' nimmt' : 'en nehmen'
  } teil`;

  return (
    <Skeleton isLoaded={typeof isLoading === 'undefined' || !isLoading}>
      <Stack direction="row" align="center" spacing={1}>
        <Icon as={FiUser} />
        <Text as="span" fontSize="sm">
          {compact ? `${count}` : fullMessage}
        </Text>
      </Stack>
    </Skeleton>
  );
};

export default EventAttendeesCountWithIcon;
