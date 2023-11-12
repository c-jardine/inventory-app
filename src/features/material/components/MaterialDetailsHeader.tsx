import { Box, DrawerHeader, Text } from '@chakra-ui/react';
import { type MaterialFullType } from '../types';
import Categories from './Categories';

export default function MaterialDetailsHeader(props: MaterialFullType) {
  return (
    <DrawerHeader display='flex' alignItems='flex-start' gap={4}>
      <Box>
        <Text fontWeight='semibold' fontSize='lg'>
          {props.name}
        </Text>
        <Categories categories={props.categories} />
      </Box>
    </DrawerHeader>
  );
}
