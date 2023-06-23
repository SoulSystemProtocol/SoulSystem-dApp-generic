import { Button } from '@mui/material';
import { truncate } from 'lodash';
import { useSnackbar } from 'notistack';
import WrongNetworkError from 'errors/WrongNetworkError';
import NoWalletError from 'errors/NoWalletError';
import { useWeb3Modal } from '@web3modal/react';
import { useSwitchNetwork } from 'wagmi';

/**
 * Hook for work with toasts.
 * @todo close toast on icon click
 */
export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();
  const { switchNetwork } = useSwitchNetwork();
  const { open } = useWeb3Modal();
  const autoHideDuration = 10000;

  const showToast = (message: string): void => {
    enqueueSnackbar(message, { autoHideDuration: autoHideDuration });
  };

  const showToastSuccess = (message: string): void => {
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: autoHideDuration,
    });
  };

  const showToastSuccessLink = (message: string, link: string): void => {
    enqueueSnackbar(message, {
      action: (
        <Button
          onClick={() => window.open(link, '_blank')?.focus()}
          color="inherit"
        >
          Open
        </Button>
      ),
      variant: 'success',
      autoHideDuration: autoHideDuration,
    });
  };

  const showToastError = (error: any): void => {
    //Error Message Overrides
    if (error instanceof NoWalletError) {
      const action = (
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            open();
          }}
          sx={{ cursor: 'pointer', borderRadius: '12px' }}
        >
          Connect Wallet
        </Button>
      );
      enqueueSnackbar(error.message, {
        action,
        autoHideDuration: autoHideDuration,
      });
    } else if (error instanceof WrongNetworkError) {
      const message = `You are connected to the wrong network. Please switch to ${process.env.NEXT_PUBLIC_NETWORK_NAME}`;
      const action = (
        <Button
          onClick={() => {
            switchNetwork?.(Number(process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID));
          }}
          color="inherit"
        >
          Switch
        </Button>
      );
      enqueueSnackbar(message, {
        action: action,
        autoHideDuration: autoHideDuration,
      });
    } else {
      let message = truncate(`Error: ${error.message}`, {
        length: 88,
      });

      if (error?.message == 'Internal JSON-RPC error.') {
        if (error?.data?.message) message = error.data.message;
        else console.warn('[DEV] Check this error', error);
      }

      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: autoHideDuration,
      });
    }
  };

  return {
    showToast,
    showToastSuccess,
    showToastSuccessLink,
    showToastError,
  };
}
