import { Button } from '@mui/material';
import useError from 'hooks/useError';
import { useState, useContext } from 'react';
import { JSONSchema7 } from 'json-schema';
import useToast from 'hooks/useToast';
import useIpfs from 'hooks/useIpfs';
import useContract from 'hooks/useContract';
import DialogWrapper from 'components/layout/DialogWrapper';
import { DialogContext } from 'contexts/dialog';
import SoulEditForm from 'components/form/SoulEditForm';

/** [DEPRECATED]
 * A dialog for creating or editing DAO.
 */
export default function GameManageDialog({ soul, game }: any): JSX.Element {
  // const { showToastSuccess } = useToast();
  // const { uploadJsonToIPFS } = useIpfs();
  // const { handleError } = useError();
  // const [isLoading, setIsLoading] = useState(false);
  // const { getContractHub } = useContract();
  const { closeDialog } = useContext(DialogContext);

  //This isn't right...
  const [formData, setFormData] = useState({
    ...(game && {
      image: game.metadata?.image,
      name: game.name,
      description: game.metadata?.description,
    }),
  });

  const schema: JSONSchema7 = {
    // description: "Soul's metadata",
    type: 'object',
    properties: {
      // cover: {
      //   type: 'string',
      //   title: 'Cover Image',
      // },
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
  console.log('Running SoulEditForm w/', { soul, game });
  return (
    <DialogWrapper
      onClose={() => setFormData({})}
      title={game ? 'Edit DAO' : 'Create DAO'}
      isClose={false}
    >
      <SoulEditForm soul={soul} schema={schema}>
        <Button variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
      </SoulEditForm>
    </DialogWrapper>
  );
}
