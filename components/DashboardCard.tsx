import { Chip, Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { capitalize } from 'lodash';
import CardAvatar from './CardAvatar';
import { roleIdToName } from 'utils/converters';
import { CardItem } from 'utils/cardContents';

/**
 * Dashboard card component.
 */
export default function DashboardCard({
  id,
  title,
  label,
  link,
  imgSrc,
  avatarIcon,
  roles = [],
  baseRoute,
}: CardItem) {
  const renderChip = !!roles?.length && (
    <Stack spacing={1} sx={{ ml: 1, alignSelf: 'flex-start' }}>
      {roles.map((role: string, index: number) => (
        <Chip key={index} label={capitalize(roleIdToName(role))} size="small" />
      ))}
    </Stack>
  );

  if (id) {
    const datalink = link || `/${baseRoute}/${id}`;
    if (!datalink) console.error('data has no link', datalink);
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '10px !important' }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}
          >
            <CardAvatar
              imgSrc={imgSrc}
              avatarIcon={avatarIcon}
              link={datalink}
            />
            <Box sx={{ ml: 2, flex: 1, alignSelf: 'flex-start' }}>
              <Link href={datalink} underline="none">
                {title}
              </Link>
              {label && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: '1px' }}
                >
                  <Link
                    href={datalink}
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
