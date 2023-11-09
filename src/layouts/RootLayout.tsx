import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 5 }}>
      <Box gridColumn={{ md: 1 }} h='100vh' bg='gray.800'></Box>
      <Box gridColumn={{ md: '2 / span 4' }}>{props.children}</Box>
    </SimpleGrid>
  );
}
