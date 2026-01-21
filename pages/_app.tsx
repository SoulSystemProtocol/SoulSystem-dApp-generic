import { useEffect } from 'react';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { DataProvider } from 'contexts/data';
import { DialogProvider } from 'contexts/dialog';
import { Web3Provider } from 'contexts/Web3Context';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { darkTheme as theme } from '../constants/theme';
import '../styles/globals.css';
import { analyticsPageView, initAnalytics } from 'utils/analytics';
import router from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import PageHead from 'components/layout/PageHead';
import { APP_CONFIGS } from 'constants/app';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API,
  cache: new InMemoryCache(),
});

const ConditionalWeb3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // if (!APP_CONFIGS.WEB3_ENABLED) return <>{children}</>;
  return <Web3Provider>{children}</Web3Provider>;
};

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
          <ConditionalWeb3Provider>
            <DataProvider>
              <DialogProvider>
                <NextNProgress height={4} />
                <PageHead {...pageProps.pageData} />
                <CssBaseline />
                <Component {...pageProps} />
              </DialogProvider>
            </DataProvider>
          </ConditionalWeb3Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
