import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { Icon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { createSlugFromString } from '../../lib/slug';
import { Venue } from '../../lib/venue';

const VenueLinkWithIcon: React.FC<Pick<Venue, 'id' | 'name'>> = ({
  id,
  name,
}) => (
  <Stack direction="row" align="center" spacing={1}>
    <Icon as={FiMapPin} />
    <Text as="span" fontSize="sm">
      <NextLink
        href={`/venues/${createSlugFromString(name, id)}`}
        passHref
        legacyBehavior
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link>{name}</Link>
      </NextLink>
    </Text>
  </Stack>
);

export default VenueLinkWithIcon;
