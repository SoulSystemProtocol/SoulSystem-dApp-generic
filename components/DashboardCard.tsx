import Link from 'next/link';
import {
  Chip,
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { capitalize } from 'lodash';
import CardAvatar from './CardAvatar';
import { roleIdToName } from 'utils/converters';

type TDashboardCard = {
  baseRoute: string;
  data: any;
};

const wrappStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
};

/**
 * Dashboard card component.
 */
export default function DashboardCard({ baseRoute, data }: TDashboardCard) {
  const { id, title, label, imgSrc, avatarIcon, roles = [] } = data;
  const renderChip = !!roles?.length && (
    <Stack spacing={1}>
      {roles.map((role: string, index: number) => (
        <Chip key={index} label={capitalize(roleIdToName(role))} size="small" />
      ))}
    </Stack>
  );

  if (id) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '10px !important' }}>
          <Box sx={wrappStyles}>
            <CardAvatar imgSrc={imgSrc} avatarIcon={avatarIcon} link={id} />
            <Box sx={{ ml: 2 }}>
              <Link href={`/${baseRoute}/${id}`} passHref>
                <MuiLink underline="none">{title}</MuiLink>
              </Link>
              {label && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {label}
                </Typography>
              )}
            </Box>
            {renderChip}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return null;
}
