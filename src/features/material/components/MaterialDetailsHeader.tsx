import { CategoryBadge } from '@/core';
import { Box, DrawerHeader, Flex, Text } from '@chakra-ui/react';
import { type MaterialFullType } from '../types';

export default function MaterialDetailsHeader(props: MaterialFullType) {
  return (
    <DrawerHeader display='flex' alignItems='flex-start' gap={4}>
      {/* <IconButton
        icon={<Icon as={IconChevronLeft} />}
        aria-label='Cancel editing'
        size='sm'
        onClick={handleCancelEdit}
      /> */}
      <Box>
        <Text fontWeight='semibold' fontSize='lg'>
          {props.name}
        </Text>
        <Flex mt={2} flexWrap='wrap' gap={2}>
          {props.categories.map((category) => (
            <CategoryBadge key={category.id} {...category} />
          ))}
        </Flex>
      </Box>
    </DrawerHeader>
  );
}
