import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const config = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = config.definePartsStyle({
  field: {
    borderRadius: 'lg',
    letterSpacing: 'wide',
    fontSize: 'sm',
    py: '1.4rem',
    caretColor: 'black',
  },
});

export const inputTheme = config.defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    //@ts-expect-error: It works...
    focusBorderColor: 'black',
    errorBordercolor: 'red.500',
  },
});
