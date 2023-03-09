import { useEffect, useState, useContext } from 'react';
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
import { CLAIM_ROLE } from 'constants/contracts';
import { POST_TYPE } from 'constants/entities';
import { DataContext } from 'contexts/data';
import useContract from 'hooks/useContract';
import useTask from 'hooks/useTask';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useToast from 'hooks/useToast';
import { DialogParams } from 'contexts/dialog';
import { JSONSchema7 } from 'json-schema';
import { analyticsEvent } from 'utils/analytics';

interface PostParams extends DialogParams {
  item: any;
  postType: string;
}

/**
 * Component: dialog for add case post (comment, confirmation).
 */
export default function PostAddDialog({
  item,
  postType = POST_TYPE.comment,
  isClose,
  onClose,
}: PostParams): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { isSoulHasRole } = useTask();
  const { getContractGame } = useContract();
  const [caseRoleNames, setCaseRoleNames] = useState<Array<string>>([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);

  const schema: JSONSchema7 = {
    type: 'object',
    ...(postType === POST_TYPE.comment && {
      // required: ['role', 'message'],
      required: ['message'],
    }),
    ...(postType === POST_TYPE.confirmation && {
      required: ['confirmationType'],
    }),
    properties: {
      // Message input
      // ...((postType === POST_TYPE.comment ||
      //   postType === POST_TYPE.confirmation) && {
      message: {
        type: 'string',
        title: 'Message',
      },
      // }),
    },
  };

  const uiSchema = {
    ...(caseRoleNames?.length === 1 && {
      role: {
        'ui:widget': 'hidden',
      },
    }),
    // evidencePostUri: {
    //   'ui:widget': 'CaseEvidencePostInput',
    //   'ui:options': {
    //     subLabel: '...',
    //   },
    // },
    message: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    },
  };

  // const widgets = {
  //   CaseEvidencePostInput: CaseEvidencePostInput,
  // };

  async function close() {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  }

  async function submit({ formData }: any): Promise<void> {
    try {
      //[MVP] Use a single role for now : 'member'
      //TODO: Add role selection if entity holds more than 1 role & default to something else...
      // if (item) formData.role = 'creator'; //or Creator for Procedures
      // else
      // formData.role = 'member';
      formData.role = caseRoleNames[0] || 'member';
      if (caseRoleNames.length > 1)
        console.warn(
          '[TODO] Use has multiple roles. Should add role selection',
          {
            caseRoleNames,
          },
        );
      console.warn('[FYI] post as', formData.role, { caseRoleNames });

      setFormData(formData);
      setIsLoading(true);
      // console.log('Send post: ', { item, role: formData.role, accountSoul });
      const { url } = await uploadJsonToIPFS({
        type: postType,
        text: formData.message,
      });
      analyticsEvent('post', { type: postType });
      await getContractGame(item.id).post(formData.role, accountSoul.id, url);

      showToastSuccess('Success! Data will be updated soon');
      close();
    } catch (error) {
      handleError(error, true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    //TODO: REFACTOR ROLES!
    // Define which roles the profile has
    if (accountSoul && item) {
      const caseRoleNames: string[] = Object.values(CLAIM_ROLE)
        .filter((caseRole: any) => {
          console.warn('caseRole', caseRole);

          return isSoulHasRole(item, accountSoul.id, caseRole.id);
        })
        .map((caseRole: any) => caseRole.name);
      console.warn('caseRoleNames', caseRoleNames);
      setCaseRoleNames(caseRoleNames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, item]);

  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? () => {} : close}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>Add Post</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          // widgets={widgets}
          formData={formData}
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
                  Send
                </Button>
                <Button
                  variant="outlined"
                  onClick={(e) => onClose && onClose(e)}
                >
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
