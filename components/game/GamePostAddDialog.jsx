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
// import CaseEvidencePostInput from 'components/form/widget/CaseEvidencePostInput';
import { CLAIM_ROLE } from 'constants/contracts';
import { POST_TYPE } from 'constants/metadata';
import { DataContext } from 'contexts/data';
import { roleIdToName } from 'utils/converters';
import getContractGame from 'hooks/useContract';
import useTask from 'hooks/useTask';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useToast from 'hooks/useToast';
// import {
//   handleAddCaseEvidenceEvent,
//   handleCommentCaseEvent,
// } from 'utils/analytics';

/**
 * A component with dialog for add case post (comment, confirmation).
 */
export default function GamePostAddDialog({
  caseObject,
  postType = POST_TYPE.comment,
  isClose,
  onClose,
}) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { isSoulHasRole } = useTask();
  const [caseRoleNames, setCaseRoleNames] = useState([]);
  const [caseRoleStrings, setCaseRoleStrings] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);

  const schema = {
    type: 'object',
    // ...(postType === POST_TYPE.evidence && {
    //   required: ['role', 'evidencePostUri'],
    // }),
    ...(postType === POST_TYPE.comment && {
      required: ['role', 'message'],
    }),
    ...(postType === POST_TYPE.confirmation && {
      required: ['confirmationType'],
    }),
    properties: {
      // Role input
      ...((postType === POST_TYPE.evidence ||
        postType === POST_TYPE.comment) && {
        role: {
          type: 'string',
          title: 'Your Role',
          enum: caseRoleNames,
          enumNames: caseRoleStrings,
          default: caseRoleNames?.[0],
        },
      }),
      // Evidence input
      // ...(postType === POST_TYPE.evidence && {
      //   evidencePostUri: {
      //     type: 'string',
      //     title: '',
      //   },
      // }),
      // Message input
      ...((postType === POST_TYPE.comment ||
        postType === POST_TYPE.confirmation) && {
        message: {
          type: 'string',
          title: 'Message',
        },
      }),
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

  async function submit({ formData }) {
    try {
      setFormData(formData);
      setIsLoading(true);
      // If post is comment
      if (postType === POST_TYPE.comment) {
        const { url } = await uploadJsonToIPFS(
          // new CommentPostMetadata(formData.message),
          { type: POST_TYPE.comment, text: formData.message },
        );
        await getContractGame(caseObject.id).post(
          // caseObject.id,
          formData.role,
          accountSoul.id,
          url,
        );
        handleCommentCaseEvent(caseObject.id);
      }
      showToastSuccess('Success! Data will be updated soon');
      close();
    } catch (error) {
      handleError(error, true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Define which roles the profile has
    if (accountSoul && caseObject) {
      const caseRoleNames = Object.values(CLAIM_ROLE)
        .filter((caseRole) =>
          isSoulHasRole(caseObject, accountSoul.id, caseRole.id),
        )
        .map((caseRole) => caseRole.name);
      const caseRoleStrings = caseRoleNames.map((caseRoleName) =>
        roleIdToName(caseRoleName),
      );
      setCaseRoleNames(caseRoleNames);
      setCaseRoleStrings(caseRoleStrings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, caseObject]);

  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? null : close}
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
