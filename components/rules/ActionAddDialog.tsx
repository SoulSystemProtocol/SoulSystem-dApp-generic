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
    required: ['subject', 'verb'],
    properties: {
      subject: {
        type: 'string',
        title: 'Acted',
        default: '',
      },
      verb: {
        type: 'string',
        title: 'Verb',
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
      'ui:placeholder': 'founder',
    },
    verb: {
      'ui:emptyValue': '',
      'ui:placeholder': 'breached',
    },
    object: {
      'ui:emptyValue': '',
      'ui:placeholder': 'contract',
    },
    tool: {
      'ui:emptyValue': '',
      'ui:widget': 'hidden',
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
      await getContractActions().addAction(
        {
          subject: formData.subject,
          verb: formData.verb,
          object: formData.object,
          tool: formData.tool,
        },
        '',
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
