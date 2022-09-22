import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/task/FundDialog';

interface IDialogContext {
  showDialog: Function;
  closeDialog: Function;
}

/**
 * A component Fund Dialog Button
 */
export default function FundDialogButton({
  address,
  sx = {},
}: any): JSX.Element {
  const { showDialog, closeDialog }: Partial<IDialogContext> =
    useContext(DialogContext);
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() =>
        showDialog?.(<FundDialog address={address} onClose={closeDialog} />)
      }
    >
      Fund
    </Button>
  );
}
