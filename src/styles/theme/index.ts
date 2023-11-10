import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { Poppins } from 'next/font/google';
import { buttonTheme, inputTheme, numberInputTheme } from './components';

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
    Button: buttonTheme,
    Textarea: defineStyleConfig({
      variants: {
        outline: {
          borderRadius: 'lg',
          letterSpacing: 'wide',
          fontSize: 'sm',
          py: '.75rem',
          caretColor: 'black',
        },
      },
      defaultProps: {
        //@ts-expect-error: It works...
        focusBorderColor: 'black',
        errorBordercolor: 'red.500',
      },
    }),
  },
});
