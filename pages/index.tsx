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
            On-chain bounties
          </Typography>
          <Typography
            variant="h4"
            fontSize="1.85em"
            letterSpacing="0.3em"
            sx={{ mt: 4, mb: 4 }}
          >
            The future of work
          </Typography>
          <Typography variant="h4" fontSize="1.6em" sx={{ mt: 1 }}>
            The uprising of the Gig Economy
          </Typography>
          {!account && (
            <Box mt={2}>
              <Typography fontSize="1.2em" letterSpacing="0.08em">
                Connect wallet to explore mDAOs
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 18, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" mr={1}>
              Need some test tokens?
            </Typography>
            <Typography sx={{ marginTop: '5px' }}>
              Request some from the{' '}
              <Link href={`https://faucet.polygon.technology/`} passHref>
                <MuiLink underline="none" target="_blank">
                  Mumbai Testnet Faucet
                </MuiLink>
              </Link>
              {/* <Link href={`https://optimismfaucet.xyz/`} passHref>
                <MuiLink underline="none" target="_blank">
                  Optimistic Kovan Faucet
                </MuiLink>
              </Link> */}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
