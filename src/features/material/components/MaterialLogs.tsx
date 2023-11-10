import { isMoreThanXDaysAway } from '@/core';
import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { Box, Circle, Flex, Icon, Text, chakra } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons-react';
import { type inferRouterOutputs } from '@trpc/server';
import { format, formatDistanceToNow } from 'date-fns';

export default function MaterialLogs(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const { data } = api.materialStockLog.getAllByMaterial.useQuery({
    id: props.id,
  });

  return (
    <>
      {data?.map((log) => (
        <Flex key={log.id} role='group' cursor='pointer' gap={4}>
          <Box position='relative' mt={3}>
            <Circle
              size={3}
              bg='gray.400'
              borderWidth={1.5}
              borderColor='white'
              transition='250ms ease'
              _groupHover={{
                bg: 'orange.400',
              }}
            />
            <Box
              w={0.5}
              h='full'
              bgGradient='linear-gradient(to bottom, #E2E8F000 0%, gray.200 75%)'
              backgroundColor='gray.200'
              position='absolute'
              left='50%'
              transform='translateX(-50%)'
              transition='250ms ease'
              _groupHover={{
                backgroundColor: 'orange.200',
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
              bg: 'gray.50',
            }}
          >
            {log.logType.name === 'Supply Order' && (
              <>
                <Text fontSize='sm'>
                  <chakra.span>
                    You received{' '}
                    {Number(Number(log.stock) - Number(log.prevStock)).toFixed(
                      2
                    )}{' '}
                    {props.stockUnit.abbreviationPlural} in a{' '}
                    <chakra.span fontWeight='semibold'>
                      Supply Order
                    </chakra.span>{' '}
                    from{' '}
                    <chakra.span fontWeight='semibold'>
                      {props.vendor.name}
                    </chakra.span>
                  </chakra.span>
                </Text>
                <Flex alignItems='center' gap={1}>
                  <Text fontSize='sm'>
                    {Number(log.prevStock)} {props.stockUnit.abbreviationPlural}
                  </Text>
                  <Icon
                    as={IconArrowRight}
                    color='gray.500'
                    w={4}
                    h={4}
                    mt={-0.5}
                  />
                  <Text fontSize='sm' fontWeight='semibold' color='green.500'>
                    {Number(log.stock).toFixed(2)}{' '}
                    {props.stockUnit.abbreviationPlural} in stock
                  </Text>
                </Flex>
              </>
            )}

            {log.logType.name === 'Audit' && (
              <>
                <Text fontSize='sm'>
                  <chakra.span>
                    You{' '}
                    {Number(log.prevStock) < Number(log.stock)
                      ? 'added'
                      : 'removed'}{' '}
                    {Math.abs(
                      Number(Number(log.stock) - Number(log.prevStock))
                    ).toFixed(2)}{' '}
                    {props.stockUnit.abbreviationPlural} in an{' '}
                    <chakra.span fontWeight='semibold'>audit</chakra.span>
                  </chakra.span>
                </Text>
                <Flex alignItems='center' gap={1}>
                  <Text fontSize='sm'>
                    {Number(log.prevStock)} {props.stockUnit.abbreviationPlural}
                  </Text>
                  <Icon
                    as={IconArrowRight}
                    color='gray.500'
                    w={4}
                    h={4}
                    mt={-0.5}
                  />
                  <Text
                    fontSize='sm'
                    fontWeight='semibold'
                    color={
                      Number(log.prevStock) < Number(log.stock)
                        ? 'green.500'
                        : 'red.500'
                    }
                  >
                    {Number(log.stock).toFixed(2)}{' '}
                    {props.stockUnit.abbreviationPlural} in stock
                  </Text>
                </Flex>
              </>
            )}

            {log.logType.name === 'Product Testing' && (
              <>
                <Text fontSize='sm'>
                  <chakra.span>
                    You used{' '}
                    {Math.abs(
                      Number(Number(log.stock) - Number(log.prevStock))
                    ).toFixed(2)}{' '}
                    {props.stockUnit.abbreviationPlural} in{' '}
                    <chakra.span fontWeight='semibold'>
                      product testing
                    </chakra.span>
                  </chakra.span>
                </Text>
                <Flex alignItems='center' gap={1}>
                  <Text fontSize='sm'>
                    {Number(log.prevStock)} {props.stockUnit.abbreviationPlural}
                  </Text>
                  <Icon
                    as={IconArrowRight}
                    color='gray.500'
                    w={4}
                    h={4}
                    mt={-0.5}
                  />
                  <Text fontSize='sm' fontWeight='semibold' color='red.500'>
                    {Number(log.stock).toFixed(2)}{' '}
                    {props.stockUnit.abbreviationPlural} in stock
                  </Text>
                </Flex>
              </>
            )}

            <Text mt={1} fontSize='xs' color='gray.500'>
              {isMoreThanXDaysAway(7, log.createdAt)
                ? format(log.createdAt, "LLL d, yyyy 'at' h:mm aaa")
                : `${formatDistanceToNow(log.createdAt)} ago`}
            </Text>
          </Box>
        </Flex>
      ))}
    </>
  );
}
