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
  // if (!soul) return <></>;
  return (
    <Grid item>
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent>
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

export function SoulCardImage({ soul, sx }: any) {
  return (
    <Box sx={{ ...sx }}>
      <Link href={soul ? `/soul/${soul.id}` : ''}>
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
