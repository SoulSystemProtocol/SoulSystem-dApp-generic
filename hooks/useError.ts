import useToast from './useToast';

/**
 * Hook for work with errors.
 */
export default function useError() {
  const { showToastError } = useToast();

  let handleError = function (error: any, isErrorToastRequired: boolean) {
    //To Console
    console.error(error);
    //** Custom Exceptions
    // eslint-disable-next-line prettier/prettier
    if (typeof error == 'object' && error.message == 'Internal JSON-RPC error.') isErrorToastRequired = false;
    // eslint-disable-next-line prettier/prettier
    else if (typeof error == 'object' && error?.code == "ACTION_REJECTED") {
      isErrorToastRequired = false;
    }
    //For User
    if (isErrorToastRequired) showToastError(error);
  };

  return {
    handleError,
  };
}
