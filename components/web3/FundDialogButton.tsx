import { Button } from '@mui/material';
import { DialogContext, IDialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/task/FundDialog';

/**
 * A component Fund Dialog Button
 */
export default function FundDialogButton({
  address,
  sx = {},
}: any): JSX.Element {
  const { showDialog, closeDialog }: Partial<DialogContext> =
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
