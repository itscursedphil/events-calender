import { Box, Divider, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const PageNav = () => (
  <Box display="flex">
    <nav>
      <NextLink href="/" passHref>
        <Link mr={3}>Home</Link>
      </NextLink>
      <NextLink href="/events" passHref>
        <Link mr={3} display={['none', 'none', 'inline']}>
          Veranstaltungen
        </Link>
      </NextLink>
      <NextLink href="/venues" passHref>
        <Link mr={3} display={['none', 'none', 'inline']}>
          Venues
        </Link>
      </NextLink>
    </nav>
  </Box>
);

const UserNav = () => (
  <Box display="flex">
    <NextLink href="/login" passHref>
      <Link>Login</Link>
    </NextLink>
  </Box>
);

const Header: React.FC = () => (
  <header>
    <Box display="flex" justifyContent="space-between" py={4}>
      <PageNav />
      <UserNav />
    </Box>
    <Divider />
  </header>
);

export default Header;
