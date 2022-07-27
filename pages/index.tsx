import { Box, Typography, Link as MuiLink } from '@mui/material';
import Layout from 'components/layout/Layout';
import Link from 'next/link';

/**
 * Home page with souls.
 */
export default function Home() {
  return (
    <Layout>
      <Box sx={{ mt: 6, textAlign: 'center', px: { xs: 0, md: 4 } }}>
        <Typography gutterBottom variant="h2">
          MentorDAO
        </Typography>
        <Typography variant="h5">
          {/* Where junior developers learn and earn */}
          The future of work
        </Typography>
        <Box sx={{ mt: 12 }}>
          <Typography variant="h5">Need some test tokens?</Typography>
          <Typography variant="h6">
            <Link href={`https://optimismfaucet.xyz/`} passHref>
              <MuiLink underline="none" target="_blank">
                Optimistic Kovan Faucet
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
