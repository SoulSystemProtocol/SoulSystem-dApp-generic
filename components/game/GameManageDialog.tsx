import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import ImageInput from 'components/form/widgets/ImageInput';
import useError from 'hooks/useError';
import { useState } from 'react';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { JSONSchema7 } from 'json-schema';
import useToast from 'hooks/useToast';
import useIpfs from 'hooks/useIpfs';
import DaoMetadata from 'classes/metadata/DaoMetadata';
import useDao from 'hooks/useDao';

/**
 * A dialog for creating or editing DAO.
 */
export default function GameManageDialog({ dao, isClose, onClose }: any) {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { createDao, editDao } = useDao();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({
    ...(dao && {
      image: dao.uriData?.image,
      name: dao.name,
      description: dao.uriData?.description,
    }),
  });

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name'],
    properties: {
      image: {
        type: 'string',
        title: '',
      },
      name: {
        type: 'string',
        title: 'Name',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
    },
  };

  const uiSchema = {
    image: {
      'ui:widget': 'ImageInput',
    },
    name: {
      'ui:disabled': dao ? true : false,
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 3,
      },
    },
  };

  const widgets = {
    ImageInput: ImageInput,
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
        new DaoMetadata(formData.image, formData.description),
      );
      if (dao) {
        await editDao(dao.id, metadataUrl);
      } else {
        await createDao(formData.name, metadataUrl);
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
      <DialogTitle sx={{ pb: 0 }}>
        {dao ? 'Edit DAO' : 'Create DAO'}
      </DialogTitle>
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
                  {dao ? 'Save' : 'Create'}
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
