import { api } from '@/utils/api';
import {
  Badge,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { type Material } from '@prisma/client';
import UpdateStockDrawer from './UpdateStockDrawer';
import MaterialDrawer from './MaterialDrawer';

export default function MaterialsTable() {
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

  function isLowStock(material: Material) {
    return Number(material.stock) < Number(material.minStock);
  }

  return (
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
          {data.map((material) => (
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
  );
}
