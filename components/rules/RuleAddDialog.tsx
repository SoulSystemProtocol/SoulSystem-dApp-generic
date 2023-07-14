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
import ActionSelect from 'components/form/widget/ActionSelect';
// import IconSelect from 'components/form/widget/IconSelect';
import { REPUTATION_DOMAIN } from 'constants/contracts';
import { JSONSchema7 } from 'json-schema';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useToast from 'hooks/useToast';
import { capitalize } from 'lodash';
import { useState } from 'react';

/**
 * Component: Dialog for adding a Rule to a Game
 */
export default function RuleAddDialog({ item, isClose, onClose }: any) {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getContractGame } = useContract();
  const { uploadJsonToIPFS } = useIpfs();
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(!isClose);
  const [isLoading, setIsLoading] = useState(false);

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['about', 'affected', 'name'],
    properties: {
      // icon: {
      //   type: 'string',
      //   title: 'Icon',
      // },
      name: {
        type: 'string',
        title: 'Title',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
      about: {
        type: 'string',
        title: 'Action',
      },
      affected: {
        type: 'string',
        title: 'Affected',
      },
      negation: {
        type: 'boolean',
        title: 'Negation',
        default: false,
      },
      evidenceDescription: {
        type: 'string',
        title: 'Evidence description, examples, requirements',
      },
      effects: {
        type: 'array',
        minItems: 1,
        title: 'Effects',
        description: 'At least 1 element must be defined',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: 'Domain',
              default: REPUTATION_DOMAIN.community.name,
              enum: [
                REPUTATION_DOMAIN.environment.name,
                REPUTATION_DOMAIN.personal.name,
                REPUTATION_DOMAIN.community.name,
                REPUTATION_DOMAIN.professional.name,
              ],
              enumNames: [
                capitalize(REPUTATION_DOMAIN.environment.name),
                capitalize(REPUTATION_DOMAIN.personal.name),
                capitalize(REPUTATION_DOMAIN.community.name),
                capitalize(REPUTATION_DOMAIN.professional.name),
              ],
            },
            value: {
              type: 'integer',
              title: 'Value',
              default: 3,
              minimum: 1,
            },
            direction: {
              type: 'boolean',
              title: 'Is positive',
              default: false,
            },
          },
        },
      },
      ruling: {
        type: 'string',
        title: 'Ruling',
        default: 'judge',
      },
      evidence: {
        type: 'boolean',
        title: 'Evidence required',
        default: true,
      },
      witness: {
        type: 'integer',
        title: 'Witnesses required',
        default: 1,
      },
    },
  };

  const uiSchema = {
    about: {
      'ui:widget': 'ActionSelect',
    },
    affected: {
      'ui:placeholder': 'Affected Role',
    },
    negation: {
      'ui:disabled': true,
      'ui:widget': 'hidden',
    },
    name: {
      'ui:placeholder': 'client received product',
    },
    // icon: {
    //   'ui:widget': 'IconSelect',
    // },
    evidenceDescription: {
      'ui:placeholder': 'Copy of contract',
    },
    ruling: {
      'ui:disabled': true,
      'ui:widget': 'hidden',
    },
    witness: {
      'ui:widget': 'updown',
    },
  };

  const widgets = {
    ActionSelect: ActionSelect,
    // IconSelect: IconSelect,
  };

  function close() {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose && onClose();
  }

  async function submit({ formData }: any) {
    try {
      setFormData(formData);
      setIsLoading(true);
      const { url: ruleMetadataUri } = await uploadJsonToIPFS(formData); //This should be good enough
      await getContractGame(item.id).ruleAdd(
        {
          about: formData.about,
          affected: formData.affected,
          negation: formData.negation,
          uri: ruleMetadataUri,
          disabled: false,
        },
        formData.effects,
        {
          ruling: formData.ruling,
          evidence: formData.evidence,
          witness: formData.witness,
        },
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
      onClose={isLoading ? () => {} : close}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add Rule</DialogTitle>
      <DialogContent>
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          widgets={widgets}
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
