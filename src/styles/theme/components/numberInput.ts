import { numberInputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const config = createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const baseStyle = config.definePartsStyle({
  field: {
    borderRadius: 'lg',
    letterSpacing: 'wide',
    fontSize: 'sm',
    py: '1.4rem',
    caretColor: 'black',
  },
  stepperGroup: {
    py: 1,
    w: 'min',
  },
  stepper: {
    bg: 'gray.200',
    rounded: 'md',
    color: 'gray.500',
    transition: '200ms ease',
    borderWidth: 0,
    px: 2,
    _hover: {
      color: 'black',
    },
  },
});

export const numberInputTheme = config.defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    //@ts-expect-error: It works...
    focusBorderColor: 'black',
    errorBordercolor: 'red.500',
  },
});
