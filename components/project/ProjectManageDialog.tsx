import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form } from '@rjsf/material-ui';
import ImageInput from 'components/form/widget/ImageInput';
import { GAME_TYPE } from 'constants/contracts';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import useContract from 'hooks/useContract';

/**
 * A dialog for creating a new project
 */
export default function ProjectManageDialog({
  project,
  isClose,
  onClose,
}: any) {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { getContractHub } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({
    ...(project && {
      image: project?.metadata?.image,
      name: project.name,
      description: project?.metadata?.description,
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
      'ui:disabled': project ? true : false,
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
      const { url: metadataUrl } = await uploadJsonToIPFS(formData);
      if (project) {
        // await editProject(project.id, meadataUrl);
        //TODO: Use Soul Edit Functionality for this
        console.error('No Mapped Function. Should Use Soul Edit');
      } else {
        await getContractHub().makeGame(
          GAME_TYPE.project,
          formData.name,
          metadataUrl,
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
      <DialogTitle sx={{ pb: 0 }}>
        {project ? 'Edit Project' : 'Create Project'}
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
                  {project ? 'Save' : 'Create'}
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
