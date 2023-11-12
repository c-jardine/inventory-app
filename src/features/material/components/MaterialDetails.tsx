import { isMoreThanXDaysAway } from '@/core';
import { poppins } from '@/styles/theme';
import {
  Box,
  Button,
  Circle,
  DrawerBody,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconExternalLink } from '@tabler/icons-react';
import { format, formatDistanceToNow } from 'date-fns';
import { type MaterialFullType } from '../types';
import MaterialLogs from './MaterialLogs';
import MaterialOptionsMenu from './MaterialOptionsMenu';

export default function MaterialDetails(
  props: MaterialFullType & {
    isEditing: boolean;
    onEdit: (val: boolean) => void;
  }
) {
  if (props.isEditing) {
    return <></>;
  }

  return (
    <DrawerBody>
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
        <Button
          variant='outline'
          w='fit-content'
          onClick={() => props.onEdit(true)}
        >
          Edit Details
        </Button>
        <MaterialOptionsMenu {...props} />
      </Stack>
      <Stack spacing={4} mt={8}>
        <Heading
          as='h2'
          pb={2}
          fontFamily={poppins.style.fontFamily}
          fontSize='lg'
          borderBottomWidth={1}
        >
          History
        </Heading>
        <Box>
          <MaterialLogs {...props} />
          <Flex role='group' cursor='pointer' gap={4}>
            <Box mt={3}>
              <Circle
                position='relative'
                size={3}
                bg='gray.400'
                borderWidth={1.5}
                borderColor='white'
                transition='250ms ease'
                _groupHover={{
                  bg: 'orange.400',
                }}
              />
            </Box>
            <Box
              w='full'
              mb={4}
              p={2}
              rounded='xl'
              transition='250ms ease'
              outline='1px solid transparent'
              _groupHover={{
                outlineColor: 'var(--chakra-colors-gray-200)',
                bg: 'gray.100',
              }}
            >
              <Text fontSize='sm' fontWeight='semibold'>
                Material created
              </Text>
              <Text fontSize='xs' color='gray.500'>
                {isMoreThanXDaysAway(7, props.createdAt)
                  ? format(props.createdAt, "LLL d, yyyy 'at' h:mm aaa")
                  : `${formatDistanceToNow(props.createdAt)} ago`}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </DrawerBody>
  );
}
