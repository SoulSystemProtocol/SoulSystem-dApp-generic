import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import SoulEditForm from 'components/form/SoulEditForm';
import { ReactElement } from 'react';

/**
 * Create or edit Soul.
 */
export default function SoulEdit({ soul }: any): ReactElement {
  return (
    <Box>
      <SoulEditForm soul={soul} />
    </Box>
  );
}
