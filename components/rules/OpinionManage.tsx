import { Box, Button, Divider, Typography } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import RuleAddDialog from 'components/rules/RuleAddDialog';
import RuleTable from 'components/rules/RuleTable';
import useError from 'hooks/useError';
import { useContext } from 'react';
import ActionsDisplay from 'components/rules/ActionsDisplay';
import { nameEntity } from 'helpers/utils';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import OpinionTable from './OpinionTable';

/**
 * Rules: CTX Opinion Managment
 * 
 * opinionAboutToken(
    address contractAddr,
    uint256 tokenId,
    string calldata domain,
    int256 score
  )
 */
export default function OpinionManage({ ctx }: { ctx: any }): JSX.Element {
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { soul } = useContext(SelectedSoulContext);

  // const { handleError } = useError();

  // if (!ctx) return <>[Entity Context]</>;
  return (
    <Box>
      {/* Rules */}
      <Box sx={{ mb: 12 }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            {nameEntity(ctx?.role)} {nameEntity('rules', true)} (Opinions)
          </Typography>
          <Typography variant="subtitle1">
            Define the organizational culture via {nameEntity('rules', true)}. Each
            {nameEntity('rules', false)} consists of a general action and a
            reaction
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
        <OpinionTable item={ctx} sx={{ mt: 2.5 }} />
      </Box>
      {/* <Divider sx={{ mb: 4 }} /> */}
      {/* <Box>
        <ActionsDisplay />
      </Box> */}
    </Box>
  );
}
