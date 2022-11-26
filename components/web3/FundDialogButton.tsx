import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/entity/task/FundDialog';

/**
 * A component Fund Dialog Button
 */
export default function FundDialogButton({
  address,
  sx = {},
  text = 'Fund Entity',
}: any): JSX.Element {
  const { showDialog, closeDialog }: Partial<IDialogParams> =
    useContext(DialogContext);
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() =>
        showDialog?.(<FundDialog address={address} onClose={closeDialog} />)
      }
    >
      {text}
    </Button>
  );
}
