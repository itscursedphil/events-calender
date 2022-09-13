import { chakra } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const Main: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <chakra.main py={3}>{children}</chakra.main>
);

export default Main;
