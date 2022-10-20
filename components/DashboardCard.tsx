import { Chip, Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { capitalize } from 'lodash';
import CardAvatar from './CardAvatar';
import { cutoff, roleIdToName } from 'utils/converters';

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
    <Stack spacing={1} sx={{ ml: 1, alignSelf: 'flex-start' }}>
      {roles.map((role: string, index: number) => (
        <Chip key={index} label={capitalize(roleIdToName(role))} size="small" />
      ))}
    </Stack>
  );

  if (id) {
    const link = data.link || `/${baseRoute}/${id}`;
    if (!data.link) console.error('data has no link', data);
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '10px !important' }}>
          <Stack direction="row" sx={wrappStyles}>
            <CardAvatar imgSrc={imgSrc} avatarIcon={avatarIcon} link={link} />
            <Box sx={{ ml: 2, flex: 1, alignSelf: 'flex-start' }}>
              <Link href={link} underline="none">
                {title}
              </Link>
              {label && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: '1px' }}
                >
                  <Link
                    href={link}
                    underline="none"
                    sx={{
                      color: 'inherit',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      lineClamp: 3,
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {label}
                  </Link>
                </Typography>
              )}
            </Box>
            {renderChip}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
}
