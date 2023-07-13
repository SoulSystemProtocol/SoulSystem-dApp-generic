import { Box, Button, Divider, Typography } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import RuleAddDialog from 'components/rules/RuleAddDialog';
import RuleTable from 'components/rules/RuleTable';
import useError from 'hooks/useError';
import { useContext } from 'react';
import ActionsDisplay from 'components/rules/ActionsDisplay';
import { nameEntity } from 'helpers/utils';

/**
 * CTX Rule Managment
 */
export default function RuleManage({ ctx }: { ctx: any }): JSX.Element {
  const { showDialog, closeDialog } = useContext(DialogContext);
  // const { handleError } = useError();

  if (!ctx) return <>[Entity Missing]</>;
  return (
    <Box>
      {/* Rules */}
      <Box sx={{ mb: 12 }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            {nameEntity(ctx?.role)} Rules
          </Typography>
          <Typography variant="subtitle1">
            Define the organizational culture via Rules. Each rule consists of a
            general action and a reaction
          </Typography>
          {/* <Divider /> */}
        </Box>
        <Button
          variant="outlined"
          onClick={() =>
            showDialog?.(<RuleAddDialog item={ctx} onClose={closeDialog} />)
          }
          sx={{ mt: 2.5 }}
        >
          Add Rule
        </Button>
        <RuleTable item={ctx} sx={{ mt: 2.5 }} />
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Box>
        {/* Actions */}
        <ActionsDisplay />
      </Box>
    </Box>
  );
}
