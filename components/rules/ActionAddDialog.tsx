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
import { JSONSchema7 } from 'json-schema';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { useState } from 'react';

interface DialogParams {
  onClose: any;
  isClose?: boolean;
}

/**
 * A dialog for adding an action.
 *
 */
export default function ActionAddDialog({
  isClose,
  onClose,
}: DialogParams): JSX.Element {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getContractActions } = useContract();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['verb'],
    properties: {
      subject: {
        type: 'string',
        title: 'Acting Role',
        default: '',
      },
      verb: {
        type: 'string',
        title: 'Action',
        default: '',
      },
      object: {
        type: 'string',
        title: 'Object',
        default: '',
      },
      tool: {
        type: 'string',
        title: 'Tool',
        default: '',
      },
    },
  };

  const uiSchema = {
    subject: {
      'ui:emptyValue': '',
      'ui:placeholder': 'who (everyone)',
    },
    verb: {
      'ui:emptyValue': '',
      'ui:placeholder': 'did',
    },
    object: {
      'ui:emptyValue': '',
      'ui:placeholder': 'what',
    },
    tool: {
      'ui:emptyValue': '',
      'ui:placeholder': 'using',
      // 'ui:widget': 'hidden',
    },
  };

  async function close(): Promise<void> {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    return onClose();
  }

  async function submit({ formData }: any): Promise<void> {
    try {
      setFormData(formData);
      setIsLoading(true);
      await getContractActions().actionAdd(
        {
          subject: formData.subject.toLowerCase(),
          verb: formData.verb.toLowerCase(),
          object: formData.object.toLowerCase(),
          tool: formData.tool.toLowerCase(),
        },
        '', //uri
      );
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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Add Action</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          onSubmit={submit}
          disabled={isLoading}
          showErrorList={false}
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
                  Add
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
