import { useState } from 'react';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import ImageInput from 'components/form/widget/ImageInput';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import useIpfs from 'hooks/useIpfs';
import DefaultRoleImage from 'components/DefaultRoleImage';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Create a new Game Role
 */
export default function EntityRolesAddDialog({
  game,
  isClose,
  onClose,
}: {
  game: any;
  isClose?: boolean;
  onClose: () => void;
}): JSX.Element {
  // const { closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS, uploadToIPFS } = useIpfs();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(!isClose);
  const { getContractGame } = useContract();
  const schema: JSONSchema7 = {
    description: 'Create a New Role Token for this Organization',
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
        default: '',
      },
      description: {
        type: 'string',
        title: 'Description',
        default: '',
      },
    },
  };
  const widgets = { ImageInput };

  const payload = renderToStaticMarkup(
    <DefaultRoleImage
      role={'[Role]'}
      game={'[Organization]'}
      style={{ height: 600, width: 600 }}
    />,
  );
  // console.warn("Payload", payload);
  // const { url } = await
  // uploadToIPFS( payload ).then((uri) => {console.warn("Payload URI:", uri)});

  const uiSchema = {
    image: {
      'ui:widget': 'ImageInput',
      borderRadius: '5px',
      size: 275,
      // value: 'ipfs://QmUmM6duopm49SGm1zYF1QK41ic4o26LzPuhgbWxiAf44a',
      label: 'label',
      'ui:options': {
        header: (
          <Typography variant="subtitle2">Image (click to upload)</Typography>
        ),
        // default: 'ipfs://QmUmM6duopm49SGm1zYF1QK41ic4o26LzPuhgbWxiAf44a',
        default: 'ipfs://QmdKX2Fp7nFcXF82kBXTKZNRH4PJASvYPohPzhWiVtRsYx',
      },
    },
    description: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 3,
      },
    },
  };
  const close = () => {
    setFormData({});
    setIsLoading(false);
    setIsOpen(false);
    onClose();
  };

  async function submit({ formData }: any) {
    setIsLoading(true);
    try {
      setFormData(formData);
      //Names in Lowercase
      formData.name = formData.name.toLowerCase();
      //Upload Metadata to IPFS
      const { url: metadataURI } = await uploadJsonToIPFS(formData);

      console.warn('[DEV] Saving metadata', { metadataURI, formData });

      await getContractGame(game.id).roleMake(formData.name, metadataURI);
      showToastSuccess('Success! Data will be updated soon');
      close();
    } catch (error: any) {
      handleError(error, true);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>Create New Role</DialogTitle>
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
