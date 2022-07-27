import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/task/FundDialog';

export default function FundDialogButton({ item, sx = {} }) {
  const { showDialog, closeDialog } = useContext(DialogContext);
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() =>
        showDialog?.(<FundDialog address={item.id} onClose={closeDialog} />)
      }
    >
      Fund Entity
    </Button>
  );
}
