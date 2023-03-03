import { Typography } from '@mui/material';
import { soulDescription } from 'utils/soul';

/**
 * Display Soul's description Field
 */
export default function SoulDescription({ soul, sx }: any) {
  const description = soulDescription(soul);
  if (description) {
    return (
      <Typography sx={{ whiteSpace: 'pre-wrap', ...sx }}>
        {description}
      </Typography>
    );
  }
  return <></>;
}
