import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import ImageInput from 'components/form/widget/ImageInput';
import useError from 'hooks/useError';
import { useState } from 'react';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { JSONSchema7 } from 'json-schema';
import useToast from 'hooks/useToast';
import useIpfs from 'hooks/useIpfs';
import useContract from 'hooks/useContract';
import { GAME_TYPE } from 'constants/contracts';
import { nameEntity } from 'helpers/utils';

/**
 * A dialog for creating or editing DAO.
 */
export default function DaoManageDialog({
  dao,
  isClose,
  onClose,
}: any): JSX.Element {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { getContractHub, getContractGame } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const [formData, setFormData] = useState({
    ...(dao && {
      image: dao.metadata?.image,
      name: dao.name,
      description: dao.metadata?.description,
    }),
  });
  const GAMETYPE = GAME_TYPE.mdao;

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

  const widgets = {
    ImageInput,
  };

  const uiSchema = {
    image: {
      'ui:widget': 'ImageInput',
    },
    name: {
      'ui:disabled': dao ? true : false,
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 3,
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
      const { url: metadataUrl } = await uploadJsonToIPFS(formData);
      if (dao) {
        //Update URI
        await getContractGame(dao.id).setContractURI(metadataUrl);
      } else {
        //Create a new MDAO
        await getContractHub().makeGame(GAMETYPE, formData.name, metadataUrl);
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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>
        {!!dao ? 'Edit ' + nameEntity('mdao') : 'Create ' + nameEntity('mdao')}
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
                  {dao ? 'Save' : 'Create'}
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
