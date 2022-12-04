import { Chip, Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { capitalize } from 'lodash';
import { CardItem } from 'utils/cardContents';
import CardAvatar from './CardAvatar';
import { SchoolOutlined } from '@mui/icons-material';
import EntityImage from './entity/EntityImage';

/**
 * Dashboard card component.
 */
export default function GridCard({
  id,
  title,
  label,
  link,
  imgSrc,
  avatarIcon,
  roles = [],
  baseRoute,
  children,
}: CardItem) {
  //TODO: Later on Replace this with <SoulRoles> (roles need to be different)
  const roleChips = !!roles?.length && (
    <Stack spacing={1} sx={{ ml: 1, alignSelf: 'center' }}>
      {roles.map((role: string, index: number) => (
        <Chip key={index} label={capitalize(role)} size="small" />
      ))}
    </Stack>
  );

  // if (!id)  return null;
  const datalink = link || `/${baseRoute}/${id}`;
  if (!datalink) console.error('Item missing a link', { link, datalink });
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}
        >
          <Link href={datalink}>
            <EntityImage
              imgSrc={imgSrc}
              icon={avatarIcon || <SchoolOutlined />}
              sx={{
                cursor: 'pointer',
                width: 82,
                height: 82,
              }}
            />
          </Link>
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
          {children}
          {roleChips}
        </Stack>
      </CardContent>
    </Card>
  );
}
