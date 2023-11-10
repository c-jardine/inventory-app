import { isMoreThanXDaysAway } from '@/core';
import { type AppRouter } from '@/server/api/root';
import { poppins } from '@/styles/theme';
import {
  Badge,
  Box,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { type Material } from '@prisma/client';
import { IconExternalLink } from '@tabler/icons-react';
import { type inferRouterOutputs } from '@trpc/server';
import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import MaterialLogs from './MaterialLogs';
import MaterialOptionsMenu from './MaterialOptionsMenu';

export default function MaterialDrawer(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const btnRef = React.useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  function isLowStock(material: Material) {
    return Number(material.stock) < Number(material.minStock);
  }

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant='link'
        px={0}
        fontSize='md'
        fontWeight='semibold'
        color={isLowStock(props) ? 'red.500' : 'black'}
        cursor='pointer'
        _hover={{
          textDecoration: 'underline',
          textUnderlineOffset: 4,
        }}
      >
        {props.name}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text fontWeight='semibold' fontSize='lg'>
              {props.name}
            </Text>
            {props.categories.map((category) => (
              <Badge key={category.id} fontWeight='normal' px={2} py={1}>
                {category.name}
              </Badge>
            ))}
          </DrawerHeader>
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
              <Button variant='outline' w='fit-content'>
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
