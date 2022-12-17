import { Typography } from '@mui/material';
import { AttributeHelper } from 'helpers/AttributeHelper';

/**
 * Display Soul's description Field
 */
export default function SoulDescription({ soul, sx }: any) {
  const description = soul?.metadata?.description
    ? soul.metadata.description
    : AttributeHelper.extractValue(soul?.metadata?.attributes, 'Description');
  if (description) {
    return <Typography sx={{ ...sx }}>{description}</Typography>;
  }
  return <></>;
}
