import { CategoryBadge } from '@/core';
import { Flex, type FlexProps } from '@chakra-ui/react';
import { type Category } from '@prisma/client';

export default function Categories(props: {
  categories: Category[];
  containerStyle?: FlexProps;
}) {
  const compareIgnoreCase = (a: string, b: string) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' });

  return (
    <Flex mt={2} gap={2} {...props.containerStyle}>
      {props.categories
        .sort((a, b) => compareIgnoreCase(a.name, b.name))
        .map((category) => (
          <CategoryBadge key={category.id} {...category} />
        ))}
    </Flex>
  );
}
