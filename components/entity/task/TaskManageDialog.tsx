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
import { GAME_TYPE } from 'constants/contracts';
import OpenTags from 'components/form/widget/OpenTags';
import { TASK_TAGS } from 'constants/entities';

/**
 * A dialog for creating or editing tasks.
 */
export default function TaskManageDialog({
  project,
  task,
  isClose,
  onClose,
}: any) {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { getContractGameProject, getContractTask } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({
    ...(task && {
      name: task.name,
      description: task?.metadata?.description,
    }),
  });

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: [{}],
      },
    },
  };

  const uiSchema = {
    name: {
      'ui:disabled': task ? true : false,
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    },
    tags: {
      'ui:widget': 'OpenTags',
      'ui:options': {
        options: TASK_TAGS,
      },
    },
  };

  const widgets = {
    OpenTags,
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
      if (task) {
        //Update URI
        await getContractTask(task.id).setContractURI(metadataUrl);
      } else {
        await getContractGameProject(project.id).makeTask(
          GAME_TYPE.task,
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
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>
        {task ? 'Edit Task' : 'Create Task'}
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
                  {task ? 'Save' : 'Create'}
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
