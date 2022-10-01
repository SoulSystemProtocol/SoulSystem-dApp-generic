import { Box, Button, Divider, Typography } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import ActionAddDialog from 'components/rules/ActionAddDialog';
import ActionTable from 'components/rules/ActionTable';
import useError from 'hooks/useError';
import useDao from 'hooks/useDao';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Dao from 'classes/Dao';

/**
 * Component: Action Display & Managment
 */
export default function ActionDisplay(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;

  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();

  const { getDaoById } = useDao();
  const [game, setGame] = useState<Dao | null>(null);

  async function loadData() {
    try {
      setGame(await getDaoById(slug as string));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (slug) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Actions
      </Typography>
      <Typography gutterBottom>
        {`General actions that a game admin can use to create the game's rules`}
      </Typography>
      <Divider />
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
