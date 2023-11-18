import {
  Box,
  Button,
  DrawerBody,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconExternalLink } from '@tabler/icons-react';
import { useMaterialDrawerContext } from '../hooks';
import { type MaterialFullType } from '../types';
import MaterialLogs from './MaterialLogs';
import MaterialOptionsMenu from './MaterialOptionsMenu';

/**
 * The individual details drawer content for a material.
 * @param props The material data,
 */
export default function MaterialDetails(props: MaterialFullType) {
  const { screen, setScreen } = useMaterialDrawerContext();

  /**
   * Set the isEditing state to true.
   */
  function onEdit() {
    setScreen('EDIT');
  }

  return (
    <DrawerBody display={screen === 'DETAILS' ? 'block' : 'none'}>
      <Stack spacing={4}>
        <SimpleGrid columns={3}>
          <Box fontSize='sm'>
            <Text color='gray.500'>Stock Level</Text>
            <Text>
              {Number(props.stock)}{' '}
              {Number(props.stock) === 1
                ? props.stockUnit.abbreviationSingular
                : props.stockUnit.abbreviationPlural}
            </Text>
          </Box>
          <Box fontSize='sm'>
            <Text color='gray.500'>Unit Cost</Text>
            <Text>
              ${Number(props.costPerUnit)} /
              {Number(props.stock) === 1
                ? props.stockUnit.abbreviationSingular
                : props.stockUnit.abbreviationPlural}
            </Text>
          </Box>
          <Box fontSize='sm'>
            <Text color='gray.500'>Min Level</Text>
            <Text>
              {Number(props.minStock)}{' '}
              {Number(props.stock) === 1
                ? props.stockUnit.abbreviationSingular
                : props.stockUnit.abbreviationPlural}
            </Text>
          </Box>
        </SimpleGrid>
        <Box fontSize='sm'>
          <Text color='gray.500'>Vendor</Text>
          {props.vendor.url ? (
            <Link
              role='group'
              href={props.vendor.url}
              target='_blank'
              display='flex'
              gap={1}
              transition='200ms ease'
            >
              {props.vendor.name}
              <Icon
                as={IconExternalLink}
                color='gray.500'
                _groupHover={{
                  color: 'black',
                }}
              />
            </Link>
          ) : (
            <Text>{props.vendor.name}</Text>
          )}
        </Box>
      </Stack>
      <Stack direction='row' spacing={4} mt={8}>
        <Button variant='outline' w='fit-content' onClick={onEdit}>
          Edit Details
        </Button>
        <MaterialOptionsMenu {...props} />
      </Stack>

      <MaterialLogs {...props} />
    </DrawerBody>
  );
}
