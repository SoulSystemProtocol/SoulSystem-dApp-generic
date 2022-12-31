import { useState } from 'react';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';

/**
 * Component: Dialog for disable (mark as obsolete) a Game's rule.
 */
export default function RuleDisableDialog({
  item,
  rule,
  isClose,
  onClose,
}: any): JSX.Element {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getContractGame } = useContract();
  const [isOpen, setIsOpen] = useState(!isClose);
  const [isLoading, setIsLoading] = useState(false);

  function close() {
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  }

  async function submit() {
    try {
      setIsLoading(true);
      await getContractGame(item.id).ruleDisable(rule.ruleId, true);
      showToastSuccess('Success! Data will be updated soon.');
      close();
    } catch (error: any) {
      handleError(error, true);
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => isLoading && close()}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Mark rule as obsolete</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Are you sure you want to mark as obsolete the rule &quot;
          <b>{rule.rule?.metadata?.name || 'Unnamed rule'}</b>&quot;?
        </Typography>
        <Typography gutterBottom>This action cannot be undone.</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          {isLoading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<Save />}
              variant="outlined"
            >
              Processing
            </LoadingButton>
          ) : (
            <>
              <Button
                variant="contained"
                type="submit"
                onClick={() => submit()}
              >
                Mark as Obsolete
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
