import { extendTheme, ThemeConfig, ThemeOverride } from '@chakra-ui/react';

const customTheme: ThemeOverride = {
  colors: {
    gray: {
      50: '#f6f6f6',
      100: '#ececec',
      200: '#dfdfdf',
      300: '#cbcbcb',
      400: '#a6a6a6',
      500: '#858585',
      600: '#5e5e5e',
      700: '#4b4b4b',
      800: '#2e2e2e',
      900: '#0d0d0d',
    },
  },
  styles: {
    global: {
      body: {
        background: 'gray.900',
      },
    },
  },
};

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...customTheme,
  config: themeConfig,
});

export default theme;
