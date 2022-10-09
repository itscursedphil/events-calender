import React from 'react';
import { Badge } from '@chakra-ui/react';

import { EventCategory } from '../../lib/event';

const getColorForCategory = (slug: string) => {
  switch (slug) {
    case 'concert':
      return 'green.200';
    case 'club':
      return 'purple.200';
    case 'theatre':
      return 'yellow.300';
    case 'arts':
      return 'cyan.300';
    default:
      return 'gray';
  }
};

const EventCategoryBadge: React.FC<Pick<EventCategory, 'name' | 'slug'>> = ({
  name,
  slug,
}) => (
  <Badge bg={getColorForCategory(slug)} variant="solid" color="black">
    {name}
  </Badge>
);

export default EventCategoryBadge;
