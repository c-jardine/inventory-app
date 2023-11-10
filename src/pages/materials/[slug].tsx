import { MaterialDrawer, UpdateStockDrawer } from '@/features/material';
import { db } from '@/server/db';
import { poppins } from '@/styles/theme';
import {
  Badge,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { IconSearch } from '@tabler/icons-react';
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';

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
        <Flex justifyContent='flex-end'>
          {/* <MaterialsForm /> */}
        </Flex>
      </SimpleGrid>
      <TableContainer overflowX='unset' overflowY='unset'>
        <Table size='sm'>
          <Thead
            position='sticky'
            top={0}
            zIndex='docked'
            bg='linear-gradient(180deg, white 0%, white 99%, var(--chakra-colors-gray-200) 99%, var(--chakra-colors-gray-200) 100%)'
          >
            <Tr>
              <Th py={2}>Name</Th>
              <Th>Stock Level</Th>
              <Th>Min Level</Th>
              <Th>Cost</Th>
              <Th>Vendor</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.materials?.map((material) => (
              <Tr key={material.id}>
                <Td>
                  <MaterialDrawer {...material} />
                </Td>

                <Td>
                  <UpdateStockDrawer {...material} />
                </Td>

                <Td fontSize='xs'>
                  {Number(material.minStock)}{' '}
                  {Number(material.minStock) === 1
                    ? material.stockUnit.nameSingular
                    : material.stockUnit.namePlural}
                </Td>
                <Td fontSize='xs'>
                  ${Number(material.costPerUnit)} /
                  {material.stockUnit.nameSingular}
                </Td>
                <Td fontSize='xs'>{material.vendor.name}</Td>
                <Td fontSize='xs'>
                  {material.categories.map((category) => (
                    <Badge key={category.id} fontWeight='medium' px={2} py={1}>
                      {category.name}
                    </Badge>
                  ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
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
