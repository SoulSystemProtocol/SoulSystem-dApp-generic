import { Typography } from '@mui/material';
import { getAttribute } from 'helpers/metadata';

/**
 * Display Soul's description Field
 */
export default function SoulDescription({ soul, sx }: any) {
  const description = soul?.metadata?.description
    ? soul.metadata.description
    : getAttribute(soul?.metadata?.attributes, 'Description');
  if (description) {
    return <Typography sx={{ ...sx }}>{description}</Typography>;
  }
  return <></>;
}
