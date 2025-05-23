import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e3f9f5',
      100: '#c1e9e0',
      200: '#9fd9cb',
      300: '#7dc9b6',
      400: '#5bb9a1',
      500: '#42a088',
      600: '#327d6b',
      700: '#225a4e',
      800: '#113731',
      900: '#001415',
    },
  },
});

export default theme;
