import { api } from '@/utils/api';
import { Box, Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import slugify from 'slugify';

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const router = useRouter();
  const { data: categories } = api.category.getAll.useQuery();

  return (
    <Flex flexDirection={{ base: 'column', lg: 'row' }}>
      <Box
        display={{ base: 'none', lg: 'block' }}
        h='100vh'
        w='250px'
        bg='gray.800'
      >
        <Stack color='white' p={8}>
          <Link as={NextLink} href='/materials'>
            Materials
          </Link>
          <Stack ml={4}>
            {router.asPath.startsWith('/materials') && (
              <>
                <Link
                  as={NextLink}
                  href='/materials'
                  color={
                    router.asPath === '/materials' ? 'white' : 'whiteAlpha.500'
                  }
                >
                  All materials
                </Link>
                {categories?.map((category) => (
                  <Link
                    key={category.id}
                    as={NextLink}
                    href={`/materials/${slugify(category.name, {
                      lower: true,
                    })}`}
                    color={
                      router.asPath ===
                      `/materials/${slugify(category.name, { lower: true })}`
                        ? 'white'
                        : 'whiteAlpha.500'
                    }
                  >
                    {category.name}
                  </Link>
                ))}
              </>
            )}
          </Stack>
        </Stack>
      </Box>
      <Box w='full'>{props.children}</Box>
    </Flex>
  );
}
