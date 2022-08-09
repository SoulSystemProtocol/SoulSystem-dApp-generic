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
// import TaskPostDeliveryMetadata from 'classes/metadata/TaskPostDeliveryMetadata';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useTask from 'hooks/useTask';
import useContract from 'hooks/useContract';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import { useState } from 'react';

/**
 * A dialog for post a task delivery.
 */
export default function TaskPostDeliveryDialog({
  task,
  isClose,
  onClose,
}: any) {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { getContractGameMDAO } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({});

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['daoId', 'text'],
    properties: {
      daoId: {
        type: 'string',
        title: 'Address of your DAO',
      },
      text: {
        type: 'string',
        title: 'Message',
      },
    },
  };

  const uiSchema = {
    text: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    },
  };

  async function close() {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  }

  async function submit({ formData }: any) {
    try {
      setFormData(formData);
      setIsLoading(true);
      const { url: metadataUrl } = await uploadJsonToIPFS(
        // new TaskPostDeliveryMetadata(formData.text),
        formData,
      );
      await getContractGameMDAO(formData.daoId).deliverTask(
        task.id,
        metadataUrl,
      );
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
