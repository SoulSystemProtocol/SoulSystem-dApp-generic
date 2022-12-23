import { useContext, useState } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import AddressHash from 'components/web3/AddressHash';
import useContract from 'hooks/useContract';
import { DialogParams } from 'contexts/dialog';
import { ethers } from 'ethers';

interface FundParams extends DialogParams {
  address: string;
}

/**
 * A dialog for apply for a task.
 */
export default function FundDialog({
  address,
  isClose,
  onClose,
  title = 'Fund',
}: FundParams): JSX.Element {
  const { showToastSuccess } = useToast();
  const { handleError } = useError();
  const { validateChain } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({});
  const { provider } = useContext(Web3Context);

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['amount'],
    properties: {
      amount: {
        type: 'number',
        title: 'Amount',
      },
    },
  };

  const close = async () => {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose && onClose();
  };

  const submit = async ({ formData }: any) => {
    try {
      validateChain();
      setFormData(formData);
      setIsLoading(true);
      let tx = {
        to: address,
        value: ethers.utils.parseEther(formData.amount.toString()),
      };
      // let receipt =
      await provider.getSigner().sendTransaction(tx);
      showToastSuccess('Funds are on their way');
      close();
    } catch (error: any) {
      handleError(error, true);
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      // eslint-disable-next-line prettier/prettier
      onClose={isLoading ? () => {} : close}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>
        {title} <AddressHash address={address} />
      </DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          formData={formData}
          onSubmit={submit}
          disabled={isLoading}
        >
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
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
                <Button variant="contained" type="submit">
                  Send
                </Button>
                <Button
                  variant="outlined"
                  onClick={(e) => onClose && onClose(e)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Stack>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
