import { HeaderBar } from '@/core';
import { MaterialsTable } from '@/features/material/components';
import { api } from '@/utils/api';
import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Materials() {
  const { data, isLoading } = api.material.getAll.useQuery();

  if (isLoading) {
    return (
      <Flex py={8} justifyContent='center'>
        <Spinner />
      </Flex>
    );
  }

  if (!data) {
    return <Text>No materials to show.</Text>;
  }

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
          <HeaderBar>Materials</HeaderBar>
          <MaterialsTable materials={data} />
        </Container>
      </main>
    </>
  );
}
