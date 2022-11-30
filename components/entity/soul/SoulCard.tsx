import { PersonOutlineOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Grid } from '@mui/material';
import EntityImage from '../EntityImage';
import Link from 'components/utils/Link';
import { SoulRoles } from './SoulRoles';
import { SoulCardDetails } from './SoulCardDetails';

/**
 * Display a single Soul
 */
export default function SoulCard({ soul, roles }: any): JSX.Element {
  if (soul) {
    return (
      <Grid item>
        <Card variant="outlined" sx={{ borderRadius: '16px' }}>
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
                <SoulCardImage soul={soul} sx={{ mr: 2 }} />
                <SoulCardDetails soul={soul} sx={{ mr: 2 }} />
              </Box>
              <Box>
                <SoulRoles roles={roles} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return <></>;
}

export function SoulCardImage({ soul, sx }: any) {
  if (soul) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/soul/${soul.id}`}>
          <EntityImage
            item={soul}
            sx={{
              cursor: 'pointer',
              width: 82,
              height: 82,
            }}
            icon={<PersonOutlineOutlined />}
          />
        </Link>
      </Box>
    );
  }
  return <></>;
}
