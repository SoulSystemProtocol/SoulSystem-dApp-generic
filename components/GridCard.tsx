import { Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { CardItem } from 'utils/cardContents';
import { AutoAwesomeOutlined } from '@mui/icons-material';
import EntityImage from './entity/EntityImage';
import { SoulRoles } from './entity/soul/SoulRoles';

/**
 * Dashboard Card Component
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
  linkSX,
}: CardItem): JSX.Element {
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
            <Link href={datalink} sx={linkSX}>
              <EntityImage
                imgSrc={imgSrc}
                icon={avatarIcon || <AutoAwesomeOutlined />}
                sx={{
                  cursor: 'pointer',
                  width: 82,
                  height: 82,
                }}
              />
            </Link>
            <Box sx={{ ml: 2 }}>
              <Link
                href={datalink}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineClamp: 2,
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {title}
              </Link>
              {label && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: '1px',
                  }}
                >
                  <Link
                    href={datalink}
                    sx={{
                      color: 'inherit',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      lineClamp: 2,
                      WebkitLineClamp: 2,
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
