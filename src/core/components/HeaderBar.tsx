import { NewMaterialDrawer } from '@/features/material/components';
import { poppins } from '@/styles';
import {
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { IconSearch } from '@tabler/icons-react';

export default function HeaderBar({
  children,
  showCreateButton = true,
}: {
  children: string;
  showCreateButton?: boolean;
}) {
  return (
    <SimpleGrid
      gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
      mb={8}
      alignItems='center'
    >
      <Heading
        as='h1'
        fontFamily={poppins.style.fontFamily}
        fontSize='2xl'
        fontWeight='semibold'
      >
        {children}
      </Heading>
      <Flex p={4}>
        <InputGroup>
          <InputLeftElement pointerEvents='none' h='full'>
            <Icon as={IconSearch} w={4} h={4} />
          </InputLeftElement>
          <Input placeholder='Search' />
        </InputGroup>
      </Flex>
      {showCreateButton && (
        <NewMaterialDrawer
          triggerStyles={{
            justifySelf: 'flex-end',
          }}
        />
      )}
    </SimpleGrid>
  );
}
