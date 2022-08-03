/**
 * Landing page with souls.
 */
import { useContext } from 'react';
import Link from 'next/link';
// import Router from 'next/router';
// import Header from 'components/layout/Header';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Web3Context } from 'contexts/web3';
import { APP_CONFIGS } from '../constants';
import { getPageTitle } from '../utils';
import Layout from 'components/layout/Layout';

const wrapperStyle = {
  // background: 'black',
  color: '#fff',
  minHeight: '100vh',
  mt: 6,
  textAlign: 'center',
  px: { xs: 2, md: 4 },
  pt: { xs: 2, md: 4 },
};

export default function Landing() {
  const { account } = useContext(Web3Context);

  return (
    <Layout title={getPageTitle('Home')}>
      <Box sx={{ width: '100%' }}>
        <Box sx={wrapperStyle}>
          <Typography mt={6} gutterBottom variant="h1" fontWeight={700}>
            {APP_CONFIGS.NAME}
          </Typography>
          <Typography variant="h4" fontSize="2em" letterSpacing="0.25em">
            {/* Where junior developers learn and earn */}
            The future of work
          </Typography>
          <Typography variant="h4" fontSize="1.5em" sx={{ mt: 1 }}>
            And the uprising of the Gig Economy
          </Typography>
          {!account && (
            <Box mt={2}>
              <Typography fontSize="1.2em" letterSpacing="0.08em">
                Connect wallet to explore mDAOs
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 22, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" mr={2}>
              Need some test tokens?
            </Typography>
            <Typography sx={{ textDecoration: 'underline', marginTop: '5px' }}>
              <Link href={`https://optimismfaucet.xyz/`} passHref>
                <MuiLink underline="none" target="_blank">
                  Optimistic Kovan Faucet
                </MuiLink>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
