import { DataProvider } from 'contexts/data';
import { Web3Provider } from 'contexts/web3';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/**
 * Component with an app.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <Web3Provider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </Web3Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
