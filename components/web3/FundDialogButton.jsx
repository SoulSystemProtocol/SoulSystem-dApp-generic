import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/task/FundDialog';

export default function FundDialogButton({ address, sx = {} }) {
  const { showDialog, closeDialog } = useContext(DialogContext);
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
