import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataProvider } from 'contexts/data';
import { DialogProvider } from 'contexts/dialog';
import { Web3Provider } from 'contexts/web3';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
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
            <DialogProvider>
              <NextNProgress height={4} />
              <Component {...pageProps} />
            </DialogProvider>
          </DataProvider>
        </Web3Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
