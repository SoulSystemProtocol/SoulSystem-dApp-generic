import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import CoverInput from 'components/form/widget/CoverInput';
import ImageInput from 'components/form/widget/ImageInput';
import SoulAttributesInput from 'components/form/widget/SoulAttributesInput';
import { DataContext } from 'contexts/data';
import { prepMetadata } from 'helpers/metadata';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import useToast from 'hooks/useToast';
import { JSONSchema7 } from 'json-schema';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useState } from 'react';

/**
 * Create or edit Soul.
 */
export default function SoulEditForm({
  soul,
  children,
  schema,
  uiSchema,
}: {
  soul?: any;
  children?: ReactElement;
  schema?: JSONSchema7;
  uiSchema?: any;
}): ReactElement {
  const STATUS = {
    available: 1,
    ipfsUpload: 2,
    waitForChain: 3,
  };
  const router = useRouter();
  const { showToastSuccess } = useToast();
  const { uploadJsonToIPFS } = useIpfs();
  const { handleError } = useError();
  const { metadataUpdate } = useContext(DataContext);
  const { getContractSoul } = useContract();
  const [status, setStatus] = useState<number>(STATUS.available);
  const [formData, setFormData] = useState(soul?.metadata || {});

  const defaultSchema: JSONSchema7 = {
    // description: "Soul's metadata",
    type: 'object',
    properties: {
      cover: {
        type: 'string',
        title: 'Cover Image',
      },
      image: {
        type: 'string',
        title: 'Photo',
      },
      attributes: {
        type: 'array',
        title: '',
        items: [{}],
      },
    },
  };

  if ((!!soul?.type || !!soul?.role) && defaultSchema?.properties?.cover) {
    delete defaultSchema.properties.cover;
    // console.log('cover removed', defaultSchema);
  }

  const defaultUiSchema = {
    image: {
      'ui:widget': 'ImageInput',
    },
    cover: {
      'ui:widget': 'CoverInput',
      'ui:options': { soul },
    },
    attributes: {
      'ui:widget': 'SoulAttributesInput',
      'ui:options': { soul },
    },
  };

  const widgets = { CoverInput, ImageInput, SoulAttributesInput };

  async function submit({ formData }: any) {
    try {
      // Update form data
      setFormData(formData);
      //Status: Uploading to IPFS
      setStatus(STATUS.ipfsUpload);
      //Prep Metadata Object  //TODO: Should probably get rid of this
      let metadata = soul.type == '' ? prepMetadata(formData) : formData;
      //Save to IPFS
      const { url: metadataUrl } = await uploadJsonToIPFS(metadata);
      //Status: Using contract / Wait for Chain
      setStatus(STATUS.waitForChain);

      if (soul) {
        let tx = await getContractSoul().update(soul.id, metadataUrl);
        showToastSuccess(
          'Update has been sent to chain and will be processed shortly',
        );
        await tx.wait();
        metadataUpdate?.(metadata);
        router.push('/soul/' + soul.id);
      } else {
        let tx = await getContractSoul().mint(metadataUrl);
        showToastSuccess('Your new soul is on its way');
        await tx.wait();
        router.push('/');
      }
    } catch (error: any) {
      handleError(error, true);
    }
    //Status: Ready
    setStatus(STATUS.available);
  }

  return (
    <Form
      schema={schema || defaultSchema}
      uiSchema={uiSchema || defaultUiSchema}
      formData={formData}
      onSubmit={submit}
      widgets={widgets}
      disabled={status !== STATUS.available ? true : false}
    >
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {status === STATUS.available && (
          <Button variant="contained" type="submit">
            {soul ? 'Save' : 'Create'}
          </Button>
        )}
        {status === STATUS.ipfsUpload && (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<Save />}
            variant="outlined"
          >
            Uploading to IPFS
          </LoadingButton>
        )}
        {status === STATUS.waitForChain && (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<Save />}
            variant="outlined"
          >
            {soul ? 'Updating Chain' : 'Minting New Soul'}
          </LoadingButton>
        )}
        {children}
      </Stack>
    </Form>
  );
}
