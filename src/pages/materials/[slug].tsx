import { MaterialsTable } from '@/features/material/components';
import { db } from '@/server/db';
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
import { Prisma } from '@prisma/client';
import { IconSearch } from '@tabler/icons-react';
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';

export default function Material(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { category } = props;

  if (!category) {
    return <div>no data</div>;
  }

  // Convert parsed material data back to Decimal and Date.
  const data = {
    ...category,
    materials: category.materials?.map((cat) => ({
      ...cat,
      stock: new Prisma.Decimal(cat.stock),
      minStock: new Prisma.Decimal(cat.minStock),
      costPerUnit: new Prisma.Decimal(cat.costPerUnit),
      createdAt: new Date(cat.createdAt),
    })),
  };

  return (
    <>
      <Head>
        <title>{category.name} | Inventory Tracker</title>
        <meta
          name='description'
          content='An inventory tracking app handling stock levels, pricing, production runs, and more.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Container maxW='container.xl' p={{ base: 4, sm: 8 }}>
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
            <Flex justifyContent='flex-end'></Flex>
          </SimpleGrid>
          {data.materials && <MaterialsTable materials={data.materials} />}
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const category = await db.category.findFirst({
    where: {
      slug: context.params?.slug,
    },
    include: {
      materials: {
        include: {
          stockUnit: true,
          vendor: true,
          categories: true,
        },
      },
    },
  });
  return {
    props: {
      // Category needs Decimal and Date objects to be parsed.
      category: {
        ...category,
        materials: category?.materials.map((cat) => ({
          ...cat,
          stock: Number(cat.stock),
          minStock: Number(cat.minStock),
          costPerUnit: Number(cat.costPerUnit),
          createdAt: cat.createdAt.toISOString(),
        })),
      },
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await db.category.findMany({
    select: {
      slug: true,
    },
  });
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
};
