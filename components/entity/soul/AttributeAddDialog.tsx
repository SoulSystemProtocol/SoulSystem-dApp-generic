import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import useError from 'hooks/useError';
import { useState } from 'react';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import useToast from 'hooks/useToast';

const defaultValues = {
  trait_type: '',
  value: '',
  display_type: 'boost_percentage',
};

/**
 * A dialog for adding attribute
 */
export default function AttributeAddDialog({
  type,
  title = 'Add Attribute',
  isClose,
  onClose,
  onSubmit,
}: any): JSX.Element {
  const { showToastSuccess } = useToast();
  const { handleError } = useError();
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState(defaultValues);

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['trait_type', 'value'],
    properties: {
      trait_type: {
        type: 'string',
        title: 'Skill Name',
      },
      value: {
        type: 'number',
        title: 'Percentage (%)',
        maximum: 100,
        minimum: 0,
        // endAdornment: '%',
      },
      // description: {
      //   type: 'string',
      //   title: 'Description',
      // },
    },
  };

  async function close() {
    setFormData(defaultValues);
    setIsOpen(false);
    onClose && onClose();
  }

  async function submit({ formData }: any) {
    try {
      setFormData(formData);
      onSubmit && onSubmit(formData);
      close();
    } catch (error: any) {
      handleError(error, true);
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>{title}</DialogTitle>
      <DialogContent>
        <Form schema={schema} formData={formData} onSubmit={submit}>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" type="submit">
              Add
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
