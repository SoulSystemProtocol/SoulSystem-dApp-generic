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
import { GAME_ROLE } from 'constants/contracts';
import useDao from 'hooks/useDao';
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

/**
 * A dialog for assign or remove DAO role for a specified soul.
 */
export default function GameRoleManageDialog({ dao, isClose, onClose }: any) {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { assignRoleToSoul, removeRoleToSoul } = useDao();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['soulId', 'action', 'roleName'],
    properties: {
      soulId: {
        type: 'string',
        title: 'Soul ID',
      },
      action: {
        type: 'string',
        title: 'Action',
        default: 'assignRole',
        enum: ['assignRole', 'removeRole'],
        enumNames: ['Assign Role', 'Remove Role'],
      },
      roleName: {
        type: 'string',
        title: 'Role',
        default: GAME_ROLE.member.name,
        enum: [GAME_ROLE.member.name, GAME_ROLE.admin.name],
        enumNames: [
          capitalize(GAME_ROLE.member.name),
          capitalize(GAME_ROLE.admin.name),
        ],
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
      if (formData.action === 'assignRole') {
        await assignRoleToSoul(dao.id, formData.soulId, formData.roleName);
      } else {
        await removeRoleToSoul(dao.id, formData.soulId, formData.roleName);
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
      onClose={isLoading ? null : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Manage Roles</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
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
