import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import { checkMongoHealth, checkSubgraphHealth, HealthStatus } from 'helpers/db';

interface AdminProps {
  subgraph: HealthStatus;
  mongo: HealthStatus;
}

const statusColor = (ok: boolean) => (ok ? 'success' : 'error');

export default function AdminDashboard({ subgraph, mongo }: AdminProps) {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Backend connectivity status
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Subgraph (existing connection)
                  </Typography>
                  <Chip
                    label={subgraph.ok ? 'OK' : 'Error'}
                    color={statusColor(subgraph.ok) as any}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {subgraph.message}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    MongoDB (MONGODB_URI)
                  </Typography>
                  <Chip
                    label={mongo.ok ? 'OK' : 'Error'}
                    color={statusColor(mongo.ok) as any}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {mongo.message}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<AdminProps> = async () => {
  const [subgraph, mongo] = await Promise.all([
    checkSubgraphHealth(),
    checkMongoHealth(),
  ]);

  return {
    props: {
      subgraph,
      mongo,
    },
  };
};
