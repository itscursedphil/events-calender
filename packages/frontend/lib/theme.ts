import { extendTheme } from '@chakra-ui/react';

const themeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config: themeConfig });

export default theme;
