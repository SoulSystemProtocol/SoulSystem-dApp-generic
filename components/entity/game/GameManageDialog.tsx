import { Button, Stack } from '@mui/material';
import ImageInput from 'components/form/widget/ImageInput';
import useError from 'hooks/useError';
import { useState, useContext } from 'react';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { JSONSchema7 } from 'json-schema';
import useToast from 'hooks/useToast';
import useIpfs from 'hooks/useIpfs';
import useContract from 'hooks/useContract';
import { GAME_TYPE } from 'constants/contracts';
import DialogWrapper from 'components/layout/DialogWrapper';
import { DialogContext } from 'contexts/dialog';

/**
 * A dialog for creating or editing DAO.
 */
export default function GameManageDialog({ game, isClose, onClose }: any) {
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const [isLoading, setIsLoading] = useState(false);
  const { getContractHub } = useContract();
  const { closeDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState({
    ...(game && {
      image: game.metadata?.image,
      name: game.name,
      description: game.metadata?.description,
    }),
  });

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

  const uiSchema = {
    image: {
      'ui:widget': 'ImageInput',
    },
    name: {
      'ui:disabled': game ? true : false,
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 3,
      },
    },
  };

  const widgets = {
    ImageInput: ImageInput,
  };

  async function submit({ formData }: any) {
    try {
      setFormData(formData);
      setIsLoading(true);
      const { url: metadataUri } = await uploadJsonToIPFS(formData);
      if (game) {
        // await editDao(game.id, metadataUri);
        console.error('No Mapped Function. Should Use Soul Edit');
      } else {
        await getContractHub().makeGame(
          GAME_TYPE.mdao,
          formData.name,
          metadataUri,
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
    <DialogWrapper
      onClose={() => setFormData({})}
      maxWidth="xs"
      title={game ? 'Edit DAO' : 'Create DAO'}
      isClose={false}
    >
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
                {game ? 'Save' : 'Create'}
              </Button>
              <Button variant="outlined" onClick={closeDialog}>
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </Form>
    </DialogWrapper>
  );
}
