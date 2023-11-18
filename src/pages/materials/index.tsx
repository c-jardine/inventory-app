import {
  MaterialsTable,
  NewMaterialDrawer,
} from '@/features/material/components';
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
import Head from 'next/head';

export default function Materials() {
  return (
    <>
      <Head>
        <title>Materials | Inventory Tracker</title>
        <meta
          name='description'
          content='An inventory tracking app handling stock levels, pricing, production runs, and more.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
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
            <NewMaterialDrawer
              triggerStyles={{
                justifySelf: 'flex-end',
              }}
            />
          </SimpleGrid>
          <MaterialsTable />
        </Container>
      </main>
    </>
  );
}
