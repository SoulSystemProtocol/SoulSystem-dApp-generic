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
import SoulSearchBox from 'components/form/widget/SoulSearchBox';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import { capitalize } from 'lodash';
import { useState } from 'react';

/**
 * Fix to support enum names in the schema.
 *
 * Details - https://github.com/rjsf-team/react-jsonschema-form/issues/2663#issuecomment-1106698186
 */
declare module 'json-schema' {
  export interface JSONSchema7 {
    enumNames?: Array<string>;
  }
}

interface DialogParams {
  game: any;
  onClose: any;
  isClose?: boolean;
}

/**
 * Assign or remove roles
 */
export default function GameRoleManageDialog({
  game,
  isClose,
  onClose,
}: DialogParams): JSX.Element {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const { getContractGame } = useContract();

  const schema: JSONSchema7 = {
    description: 'Mint or burn NFTs that represent a organizational roles',
    type: 'object',
    required: ['soulId', 'action', 'roleName'],
    properties: {
      action: {
        type: 'string',
        title: 'Action',
        default: 'assignRole',
        enum: ['assignRole', 'removeRole'],
        enumNames: ['Assign (Mint)', 'Remove (Burn)'],
      },
      roleName: {
        type: 'string',
        title: 'Role',
        default: 'member',
        enum: ['member', 'admin'],
        enumNames: [capitalize('member'), capitalize('admin')],
      },
      soulId: {
        type: 'string',
        title: 'Soul',
      },
    },
  };

  const uiSchema = {
    soulId: {
      'ui:widget': 'SoulSearchBox',
    },
  };

  const widgets = {
    SoulSearchBox,
  };

  async function close() {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  }

  async function submit({ formData }: any) {
    setIsLoading(true);
    try {
      setFormData(formData);
      if (formData.action === 'assignRole') {
        await getContractGame(game.id).roleAssignToToken(
          formData.soulId,
          formData.roleName,
        );
      } else if (formData.action === 'removeRole') {
        await getContractGame(game.id).roleRemoveFromToken(
          formData.soulId,
          formData.roleName,
        );
      } else console.error('Unknown action: ' + formData.action);
      showToastSuccess('Success! Data will be updated soon');
      close();
    } catch (error: any) {
      handleError(error, true);
    }
    setIsLoading(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? null : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Manage Roles</DialogTitle>
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
                  Submit
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
