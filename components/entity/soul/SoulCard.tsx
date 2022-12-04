import { Box, Card, CardContent, Grid } from '@mui/material';
import { SoulRoles } from './SoulRoles';
import { SoulCardDetails } from './SoulCardDetails';
import SoulCardImage from 'components/entity/soul/SoulCardImage';

/**
 * Display a Single Soul
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
