import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataProvider } from 'contexts/data';
import { DialogProvider } from 'contexts/dialog';
import { Web3Provider } from 'contexts/Web3Context';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API,
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '10px !important',
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: '"Montserrat", Open Sans',
      background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
      fontFamily: '"Montserrat", Open Sans',
    },
    h5: {
      fontSize: '1.2rem',
    },
    subtitle1: {
      opacity: 0.75,
      fontWeight: 400,
    },
  },
});

/**
 * Component with an app.
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={3}>
          <Web3Provider>
            <DataProvider>
              <DialogProvider>
                <NextNProgress height={4} />
                <Component {...pageProps} />
              </DialogProvider>
            </DataProvider>
          </Web3Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
