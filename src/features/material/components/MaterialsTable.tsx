import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { type MaterialFullType } from '../types';
import Categories from './Categories';
import MaterialDrawer from './MaterialDrawer';
import UpdateStockDrawer from './UpdateStockDrawer';

type MaterialsTableProps = {
  materials: MaterialFullType[];
};

export default function MaterialsTable(props: MaterialsTableProps) {
  const { materials } = props;

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
          {materials.map((material) => (
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
                  ? material.stockUnit.abbreviationSingular
                  : material.stockUnit.abbreviationPlural}
              </Td>
              <Td fontSize='xs'>
                ${Number(material.costPerUnit)} /
                {material.stockUnit.abbreviationSingular}
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
