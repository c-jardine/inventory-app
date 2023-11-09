import { extendTheme } from '@chakra-ui/react';
import { Poppins } from 'next/font/google';
import { inputTheme, numberInputTheme } from './components';

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: poppins.style.fontFamily,
      },
    },
  },
  layerStyles: {
    menuItem: {
      fontSize: 'xs',
    },
  },
  components: {
    Input: inputTheme,
    NumberInput: numberInputTheme,
  },
});
