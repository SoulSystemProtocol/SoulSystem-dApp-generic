import useToast from './useToast';

/**
 * Hook for work with errors.
 */
export default function useError() {
  const { showToastError } = useToast();

  let handleError = function (error: any, isErrorToastRequired: boolean) {
    //To Console
    console.error('Error Encountered:', { error });
    //** Custom Exceptions
    if (typeof error == 'object' && error?.code == 'ACTION_REJECTED') {
      isErrorToastRequired = false;
    }
    if (typeof error == 'object' && error?.code == 'UNPREDICTABLE_GAS_LIMIT') {
      isErrorToastRequired = false;
      showToastError({ message: 'Contract/Chain Error' });
    }
    //For User
    if (isErrorToastRequired) showToastError(error);
  };

  return {
    handleError,
  };
}
