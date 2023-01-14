import { Typography } from '@mui/material';
import { MetaAttrHelper } from 'helpers/MetaAttrHelper';
import { soulDescription } from 'utils/soul';

/**
 * Display Soul's description Field
 */
export default function SoulDescription({ soul, sx }: any) {
  const description = soulDescription(soul);
  if (description) {
    return <Typography sx={{ ...sx }}>{description}</Typography>;
  }
  return <></>;
}
