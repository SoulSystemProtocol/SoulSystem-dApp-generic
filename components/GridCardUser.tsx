import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'components/utils/Link';
import { Box } from '@mui/system';
import { CardItem } from 'utils/cardContents';
import { AutoAwesomeOutlined } from '@mui/icons-material';
import EntityImage from './entity/EntityImage';
import { SoulRoles } from './entity/soul/SoulRoles';
import { soulCover, soulDescription } from 'utils/soul';
import SoulDescription from './entity/soul/SoulDescription';

/**
 * List Card
 */
export default function GridCardUser({
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
  entity,
}: CardItem): JSX.Element {
  const datalink = link || `/${baseRoute}/${id}`;
  if (!datalink) console.error('Item missing a link', { link, datalink });
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="96" image={soulCover(entity)} alt="" />
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
                  borderRadius: '50%',
                  border: '3px solid ' + theme.palette.background.default,
                  mt: '-40px',
                  ml: 'auto',
                  mr: 'auto',
                }}
              />
            </Link>
            <Box sx={{ ml: 2, height: '95px' }}>
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
                    fontSize: '0.85em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    lineClamp: 2,
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
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
                    {soulDescription(entity)}
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
