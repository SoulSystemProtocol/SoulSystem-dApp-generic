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
import useIpfs from 'hooks/useIpfs';
import useContract from 'hooks/useContract';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import { useContext, useState } from 'react';
import { CLAIM_POST_TYPE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import MySoulsBox from 'components/form/widget/MySoulsBox';

/**
 * A dialog for post a task delivery.
 */
export default function TaskPostDeliveryDialog({
  task,
  isClose,
  onClose,
}: any): JSX.Element {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { getContractGameMDAO, getContractTask } = useContract();
  const { accountSoul } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({});

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['account', 'text'],
    properties: {
      // daoId: {
      //   type: 'string',
      //   title: 'Address of your DAO',
      // },
      account: {
        type: 'string',
        title: 'Deliver as',
      },
      text: {
        type: 'string',
        title: 'Details',
      },
    },
  };

  const uiSchema = {
    account: {
      'ui:widget': 'MySoulsBox',
    },
    text: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 6,
      },
    },
  };

  const widgets = {
    MySoulsBox,
  };

  async function close() {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  }

  async function submit({ formData }: any): Promise<void> {
    try {
      setFormData(formData);
      setIsLoading(true);
      const { url: metadataUrl } = await uploadJsonToIPFS({
        ...formData,
        type: CLAIM_POST_TYPE.application,
      });

      if (formData.account == accountSoul.owner) {
        console.log(`Deliver as Oneself:${task.id}`, { formData, metadataUrl });
        //Deliver as Oneself
        await getContractTask(task.id).post(
          'applicant',
          accountSoul.id,
          metadataUrl,
        );
      } else {
        //Deliver as mDAO
        await getContractGameMDAO(formData.account).deliverTask(
          task.id, //Task Address
          metadataUrl, //URI String
        );
      }
      showToastSuccess('Success! Data will be updated soon');
      close();
    } catch (error: any) {
      handleError(error, true);
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? () => {} : close}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Post Task Delivery</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          widgets={widgets}
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
                  Post
                </Button>
                <Button variant="outlined" onClick={onClose}>
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
