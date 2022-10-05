// TODO: Fix lint warning
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import useCurrentUserStore from '../../hooks/useCurrentUser';

interface MenuStore {
  open: boolean;
  toggleOpen: () => void;
}

const useMenuStore = create(
  devtools<MenuStore>(
    (set) => ({
      open: false,
      toggleOpen: () =>
        set((state) => ({
          open: !state.open,
        })),
    }),
    { name: 'MenuStore' }
  )
);

const UserAwareAuthActionLink: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  const { user, loading, initialized } = useCurrentUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
  }));

  return (
    <Skeleton isLoaded={initialized && !loading}>
      {user ? (
        <NextLink href="/logout" passHref>
          <Link>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span onClick={onClick}>Logout</span>
          </Link>
        </NextLink>
      ) : (
        <NextLink href="/login" passHref>
          <Link>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span onClick={onClick}>Login</span>
          </Link>
        </NextLink>
      )}
    </Skeleton>
  );
};

const MobileMenu = () => {
  const { open, toggle } = useMenuStore((state) => ({
    open: state.open,
    toggle: state.toggleOpen,
  }));
  const { user } = useCurrentUserStore((state) => ({
    user: state.user,
  }));

  return (
    <Drawer isOpen={open} onClose={toggle} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <Stack>
            {!!user && (
              <>
                <Stack>
                  <Box display="flex" alignItems="center">
                    <Avatar name={user.username} size="sm" mr={3} />
                    <Text>{user.username}</Text>
                  </Box>
                </Stack>
                <NextLink href="/me/calendar" passHref>
                  <Link>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <span onClick={toggle}>Mein Kalender</span>
                  </Link>
                </NextLink>
                <Divider />
              </>
            )}
            <NextLink href="/" passHref>
              <Link>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <span onClick={toggle}>Home</span>
              </Link>
            </NextLink>
            <NextLink href="/events" passHref>
              <Link>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <span onClick={toggle}>Veranstaltungen</span>
              </Link>
            </NextLink>
            <NextLink href="/venues" passHref>
              <Link>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <span onClick={toggle}>Orte</span>
              </Link>
            </NextLink>
            <Divider />
            <UserAwareAuthActionLink onClick={toggle} />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const PageNav = () => {
  const { toggleMenu } = useMenuStore((state) => ({
    toggleMenu: state.toggleOpen,
  }));

  return (
    <Box display="flex">
      <nav>
        <IconButton
          aria-label="Menü öffnen"
          icon={<HamburgerIcon />}
          mr={3}
          display={['inline-flex', 'inline-flex', 'none']}
          onClick={toggleMenu}
        />
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
};

const UserNav = () => {
  return (
    <Box display="flex">
      <UserAwareAuthActionLink />
    </Box>
  );
};

const Header: React.FC = () => (
  <header>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
    >
      <PageNav />
      <UserNav />
      <MobileMenu />
    </Box>
    <Divider />
  </header>
);

export default Header;
