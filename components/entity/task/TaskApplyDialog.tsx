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
import MySoulsBox from 'components/form/widget/MySoulsBox';
import { DataContext } from 'contexts/data';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import useIpfs from 'hooks/useIpfs';
import { nameEntity } from 'hooks/utils';
import { JSONSchema7 } from 'json-schema';
import { useContext, useState } from 'react';

/**
 * A dialog for apply for a task.
 */
export default function TaskApplyDialog({ task, isClose, onClose }: any) {
  const { showToastSuccess } = useToast();
  const { handleError } = useError();
  const { getContractTask, getContractGameMDAO } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({});
  const { accountSoul } = useContext(DataContext);
  const { uploadJsonToIPFS } = useIpfs();

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['account'],
    properties: {
      account: {
        type: 'string',
        title: 'Apply as',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
    },
  };

  const uiSchema = {
    account: {
      'ui:widget': 'MySoulsBox',
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
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
    console.log('TaskApplyDialog() Form Submitted', formData);
    try {
      setFormData(formData);
      setIsLoading(true);

      //Generate Metadata URI
      const { url: metadataUrl } = await uploadJsonToIPFS({
        description: formData.description,
      });

      // if (formData.soulId == accountSoul.id) {
      if (formData.account == accountSoul.owner) {
        console.log(`Apply for Task:${task.id}`, { formData, metadataUrl });
        //Apply as Oneself
        await getContractTask(task.id).application(
          formData?.description ? metadataUrl : '',
        );
      } else {
        //Apply as an mDAO
        // let soul = await getSoulById(formData.soulId);
        // await getContractGameMDAO(soul.owner).applyToTask(
        await getContractGameMDAO(formData.account).applyToTask(
          task.id,
          formData?.description ? metadataUrl : '',
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
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Apply For a {nameEntity('task')}</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          widgets={widgets}
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
                  Apply
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
