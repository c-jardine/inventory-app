import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/styles/theme';
import { RootLayout } from '@/layouts';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
