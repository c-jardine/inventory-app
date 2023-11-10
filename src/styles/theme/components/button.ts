import { defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  variants: {
    solid: {
      fontSize: 'sm',
    },
    outline: {
      fontSize: 'sm',
    },
  },
  defaultProps: {
    //@ts-expect-error: It works...
    focusBorderColor: 'black',
    errorBordercolor: 'red.500',
  },
});
