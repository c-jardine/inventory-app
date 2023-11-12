import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import { toastOptions } from '@/core/components/Toast';
import { RootLayout } from '@/layouts';
import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} toastOptions={toastOptions}>
      <RootLayout>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
        />
        <Component {...pageProps} />
      </RootLayout>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
