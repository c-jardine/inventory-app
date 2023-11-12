import { MaterialFormDrawer, MaterialsTable } from '@/features/material';
import { poppins } from '@/styles/theme';
import {
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { IconSearch } from '@tabler/icons-react';

export default function Materials() {
  return (
    <Container maxW='container.xl' w='full' p={{ base: 4, sm: 8 }}>
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
          Materials
        </Heading>
        <Flex p={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none' h='full'>
              <Icon as={IconSearch} w={4} h={4} />
            </InputLeftElement>
            <Input placeholder='Search' />
          </InputGroup>
        </Flex>
        <Flex justifyContent='flex-end'>
          <MaterialFormDrawer />
        </Flex>
      </SimpleGrid>
      <MaterialsTable />
    </Container>
  );
}
