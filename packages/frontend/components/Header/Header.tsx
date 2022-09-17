// TODO: Fix lint warning
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Divider, Link, Skeleton } from '@chakra-ui/react';
import NextLink from 'next/link';

import useCurrentUserStore from '../../hooks/useCurrentUser';

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
          Orte
        </Link>
      </NextLink>
    </nav>
  </Box>
);

const UserNav = () => {
  const { user, loading, initialized } = useCurrentUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
  }));

  return (
    <Box display="flex">
      <Skeleton isLoaded={initialized && !loading}>
        {user ? (
          <NextLink href="/logout" passHref>
            <Link>Logout</Link>
          </NextLink>
        ) : (
          <NextLink href="/login" passHref>
            <Link>Login</Link>
          </NextLink>
        )}
      </Skeleton>
    </Box>
  );
};

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
