import { Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { CardItem } from 'utils/cardContents';
import { SchoolOutlined } from '@mui/icons-material';
import EntityImage from './entity/EntityImage';
import { SoulRoles } from './entity/soul/SoulRoles';

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
  // if (!id)  return null;
  const datalink = link || `/${baseRoute}/${id}`;
  if (!datalink) console.error('Item missing a link', { link, datalink });
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}
        >
          <Stack direction="row">
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
            <Box sx={{ ml: 2 }}>
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
          </Stack>
          {children}
          <SoulRoles roles={roles} />
        </Stack>
      </CardContent>
    </Card>
  );
}
