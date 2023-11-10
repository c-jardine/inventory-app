import { api } from '@/utils/api';
import { Box, Link, SimpleGrid, Stack } from '@chakra-ui/react';
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
    <SimpleGrid columns={{ base: 1, md: 5 }}>
      <Box gridColumn={{ md: 1 }} h='100vh' bg='gray.800'>
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
      <Box gridColumn={{ md: '2 / span 4' }}>{props.children}</Box>
    </SimpleGrid>
  );
}
