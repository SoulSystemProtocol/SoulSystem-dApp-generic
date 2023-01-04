import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import DialogWrapper from 'components/layout/DialogWrapper';
import { DialogContext } from 'contexts/dialog';
import SoulEditForm from 'components/form/SoulEditForm';

/** [DEPRECATED] -- Example for Using DialogWrapper
 * A dialog for creating or editing DAO.
 */
export default function GameManageDialog({ soul, game }: any): JSX.Element {
  const { closeDialog } = useContext(DialogContext);

  //This isn't right...
  const [formData, setFormData] = useState({
    ...(game && {
      image: game.metadata?.image,
      name: game.name,
      description: game.metadata?.description,
    }),
  });

  console.log('Running SoulEditForm w/', { soul, game });
  return (
    <DialogWrapper
      onClose={() => setFormData({})}
      title={game ? 'Edit DAO' : 'Create DAO'}
      isClose={false}
    >
      <SoulEditForm soul={soul}>
        <Button variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
      </SoulEditForm>
    </DialogWrapper>
  );
}
