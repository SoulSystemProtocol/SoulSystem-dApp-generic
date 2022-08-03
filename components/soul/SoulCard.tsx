import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import Link from 'next/link';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
  roleIdToName,
} from 'utils/converters';

/**
 * A component with a card with soul.
 */
export default function SoulCard({ soul, roles }: any) {
  if (soul) {
    return (
      <Grid item>
        <Card variant="outlined">
          <CardContent sx={{ p: '10px !important' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
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
              <SoulRoles roles={roles} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return <></>;
}

export function SoulRoles({ roles }: any) {
  if (roles?.length > 0) {
    return (
      <Stack spacing={1}>
        {roles.map((role: string, index: number) => (
          <Chip
            key={index}
            label={capitalize(
              roleIdToName(role),
              // Object.values(GAME_ROLE).find((element) => element.id == role)?.name,
            )}
            // label={role}
            size="small"
          />
        ))}
      </Stack>
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
