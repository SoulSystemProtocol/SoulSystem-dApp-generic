import { useState } from 'react';
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
import { Typography } from '@mui/material';
import { useSigner } from 'wagmi';
import { useNetwork } from 'wagmi';
import { useAccount } from 'wagmi';
import TooltipButton from 'components/layout/TooltipButton';

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
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const account = useAccount();

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
    if (!signer) {
      console.error('No Signer');
      return;
    }
    try {
      validateChain();
      setFormData(formData);
      setIsLoading(true);
      let tx = {
        to: address,
        value: ethers.utils.parseEther(formData.amount.toString()),
      };
      // let receipt =
      await signer.sendTransaction(tx);
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
        {title}
        <Stack direction="row">
          <Typography variant="body2">
            Send {chain?.id ? chain.nativeCurrency.name : 'funds'} to address:
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 2 }}>
            <AddressHash
              address={address}
              displayLink={true}
              displayCopy={false}
            />
          </Typography>
        </Stack>
        {/* Dev Env */}
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontSize: '0.7em' }}
        >
          * note that this product is still in active development. Use with
          caution.
        </Typography>
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
                <TooltipButton
                  disabled={account.isDisconnected}
                  tooltip={
                    account.isDisconnected
                      ? 'You must first connected your web3 wallet'
                      : ''
                  }
                  variant="contained"
                  type="submit"
                >
                  Send
                </TooltipButton>
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
