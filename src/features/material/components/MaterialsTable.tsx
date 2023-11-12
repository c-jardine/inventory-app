import { api } from '@/utils/api';
import {
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
import Categories from './Categories';
import MaterialDetailsDrawer from './MaterialDetailsDrawer';
import UpdateStockDrawer from './UpdateStockDrawer';

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

  return (
    <TableContainer overflowX='scroll' overflowY='unset'>
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
                <MaterialDetailsDrawer {...material} />
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
                <Categories categories={material.categories} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
