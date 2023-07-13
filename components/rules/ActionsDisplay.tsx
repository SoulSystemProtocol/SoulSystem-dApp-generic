import { Box, Button, Divider, Typography } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import ActionAddDialog from 'components/rules/ActionAddDialog';
import ActionTable from 'components/rules/ActionTable';
import useError from 'hooks/useError';
import { useContext } from 'react';

/**
 * Action Display & Managment
 */
export default function ActionDisplay(): JSX.Element {
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Actions
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {`General actions that a game admin can use to create the game's rules`}
      </Typography>
      {/* <Divider /> */}
      <Button
        variant="outlined"
        onClick={() => showDialog?.(<ActionAddDialog onClose={closeDialog} />)}
        sx={{ mt: 2.5 }}
      >
        Add Action
      </Button>
      <ActionTable sx={{ mt: 2.5 }} />
    </Box>
  );
}
