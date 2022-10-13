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
import { useState } from 'react';

/**
 * Component: Dialog for generic Soul Post.
 */
export default function SoulPostDialog({
  item,
  isClose,
  onClose,
}: any): JSX.Element {
  const { showToastSuccess } = useToast();
  const { handleError } = useError();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({});
  const { uploadJsonToIPFS } = useIpfs();
  const { getContractSoul } = useContract();

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['text'],
    properties: {
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
        rows: 9,
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
      const { url: metadataUrl } = await uploadJsonToIPFS(formData);
      await getContractSoul().post(item.id, metadataUrl, '');
      showToastSuccess('Success! Post is on its way to the chain');
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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Write an Immutable Post</DialogTitle>
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
