import { Button } from '@mui/material';
import { truncate } from 'lodash';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { Web3Context } from 'contexts/web3';
import WrongNetworkError from 'errors/WrongNetworkError';

/**
 * Hook for work with toasts.
 */
export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();
  const { switchNetwork } = useContext(Web3Context);
  const autoHideDuration = 10000;

  const showToast = function (message: string) {
    enqueueSnackbar(message, { autoHideDuration: autoHideDuration });
  };

  const showToastSuccess = function (message: string) {
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: autoHideDuration,
    });
  };

  const showToastSuccessLink = function (message: string, link: string) {
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

  const showToastError = function (error: any) {
    //Error Message Overrides
    if (error instanceof WrongNetworkError) {
      const message = `You are connected to the wrong network. Please switch to ${process.env.NEXT_PUBLIC_NETWORK_NAME}`;
      const action = (
        <Button
          onClick={() => {
            switchNetwork?.();
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
