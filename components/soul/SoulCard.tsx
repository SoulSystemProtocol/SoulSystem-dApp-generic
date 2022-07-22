import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from 'utils/converters';

/**
 * A component with a card with soul.
 */
export default function SoulCard({ soul }: any) {
  if (soul) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '10px !important' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <SoulImage soul={soul} sx={{ mr: 2 }} />
            <SoulDetails soul={soul} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return <></>;
}

export function SoulImage({ soul, sx }: any) {
  if (soul) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/souls/${soul.id}`} passHref>
          <Avatar
            sx={{
              cursor: 'pointer',
              width: 82,
              height: 82,
              borderRadius: '16px',
            }}
            src={soul.uriImage}
          >
            <PersonOutlineOutlined />
          </Avatar>
        </Link>
      </Box>
    );
  }

  return <></>;
}

export function SoulDetails({ soul, sx }: any) {
  if (soul) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/souls/${soul.id}`} passHref>
          <MuiLink underline="none">{soulToFirstLastNameString(soul)}</MuiLink>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {addressToShortAddress(soul.owner)}
        </Typography>
      </Box>
    );
  }

  return <></>;
}
