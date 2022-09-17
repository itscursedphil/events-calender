import React, { PropsWithChildren } from 'react';
import { chakra } from '@chakra-ui/react';

const Main: React.FC<PropsWithChildren> = ({ children }) => (
  <chakra.main py={3}>{children}</chakra.main>
);

export default Main;
