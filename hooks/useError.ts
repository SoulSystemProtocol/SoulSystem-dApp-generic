import useToast from './useToast';

/**
 * Hook for work with errors.
 */
export default function useError() {
  const { showToastError } = useToast();

  let handleError = function (error: Error, isErrorToastRequired: boolean) {
    //To Console
    console.error(error);
    //Custom Exceptions
    if (typeof error == 'object' && error.message == 'Internal JSON-RPC error.')
      isErrorToastRequired = false;
    //For User
    if (isErrorToastRequired) showToastError(error);
  };

  return {
    handleError,
  };
}
