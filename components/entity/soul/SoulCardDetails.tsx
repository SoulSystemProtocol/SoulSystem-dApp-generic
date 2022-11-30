import { Box, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import {
  soulToFirstLastNameString,
  addressToShortAddress,
} from 'utils/converters';

/**
 * Soul Details for Small Cards
 */
export function SoulCardDetails({ soul, sx }: any) {
  if (soul) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/soul/${soul.id}`}>{soulToFirstLastNameString(soul)}</Link>
        <Typography variant="body2" color="text.secondary">
          {addressToShortAddress(soul.owner)}
        </Typography>
      </Box>
    );
  }
  return <></>;
}
