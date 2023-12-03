import {
  responsiveFontSizes,
  ThemeProvider,
  styled,
} from '@mui/material/styles';
import { DataProvider } from 'contexts/data';
import { DialogProvider } from 'contexts/dialog';
import { Web3Provider } from 'contexts/Web3Context';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { darkTheme as theme } from '../constants/theme';
import '../styles/globals.css';
import { useEffect } from 'react';
import { analyticsPageView, initAnalytics } from 'utils/analytics';
import router from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import PageHead from 'components/layout/PageHead';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API,
  cache: new InMemoryCache(),
});

/**
 * Component with an app.
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  /// Init analytics
  useEffect(() => initAnalytics(), []);

  /**
   * Send page view event to analytics if page changed via router
   */
  useEffect(() => {
    // const handleRouteChange = function () { analyticsPageView(); };
    router.events.on('routeChangeComplete', analyticsPageView);
    return () => {
      router.events.off('routeChangeComplete', analyticsPageView);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <SnackbarProvider maxSnack={3}>
          <Web3Provider>
            <DataProvider>
              <DialogProvider>
                <NextNProgress height={4} />
                <PageHead {...pageProps.pageData} />
                <CssBaseline />
                <Component {...pageProps} />
              </DialogProvider>
            </DataProvider>
          </Web3Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
