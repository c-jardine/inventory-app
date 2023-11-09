import {
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function NumberStepper() {
  return (
    <NumberInputStepper
      gap={1}
      mr={1}
      // display='none'
      opacity={0}
      transition='100ms ease'
      _groupHover={{
        display: 'flex',
        opacity: 1
      }}
      _groupFocusWithin={{
        display: 'flex',
        opacity: 1
      }}
      _groupActive={{
        display: 'flex',
        opacity: 1
      }}
    >
      <NumberIncrementStepper>
        <Icon as={IconChevronUp} w={3} h={3} strokeWidth={4} />
      </NumberIncrementStepper>
      <NumberDecrementStepper sx={{ borderTopWidth: '0 !important' }}>
        <Icon as={IconChevronDown} w={3} h={3} strokeWidth={4} />
      </NumberDecrementStepper>
    </NumberInputStepper>
  );
}
