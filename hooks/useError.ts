import { analyticsCatchErrorEvent } from 'utils/analytics';
import useToast from './useToast';

/**
 * Hook for work with errors.
 */
export default function useError() {
  const { showToastError } = useToast();

  const handleError = function (
    error: any,
    isErrorToastRequired: boolean = true,
  ) {
    //To Console
    console.error('Error Encountered:', { error });
    analyticsCatchErrorEvent(error);
    //** Custom Exceptions
    if (typeof error == 'object' && error?.code == 'ACTION_REJECTED') {
      //Rejected by User
      isErrorToastRequired = false;
      // analyticsCatchErrorEvent(error, {
      //   source: 'metamask',
      //   type: 'action_rejected',
      // });
    } else if (
      typeof error == 'object' &&
      error?.code == 'UNPREDICTABLE_GAS_LIMIT'
    ) {
      //Generic Chain Error
      isErrorToastRequired = false;
      showToastError({ message: 'Contract Error' });
    } else if (typeof error == 'object' && error?.code == -32603) {
      //Insuficient Gas
      isErrorToastRequired = false;
      showToastError({ message: 'Metamask: Transaction underpriced' });
    }
    //For User
    if (isErrorToastRequired) showToastError(error);
  };

  return {
    handleError,
  };
}
