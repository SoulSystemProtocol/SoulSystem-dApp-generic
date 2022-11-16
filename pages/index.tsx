import { useContext } from 'react';
import Link from 'components/utils/Link';
import Layout from 'components/layout/Layout';
import ConnectButton from 'components/web3/connect/ConnectButton';
import { Box, Typography } from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import { APP_CONFIGS } from '../constants';
import { getPageTitle } from '../utils';

const wrapperStyle = {
  // background: 'black',
  color: '#fff',
  textAlign: 'center',
  px: { xs: 2, md: 4 },
  pt: { xs: 2, md: 4 },
};

/**
 * Home Page
 */
export default function Landing() {
  const { account } = useContext(Web3Context);

  return (
    <Layout title={getPageTitle('Home')}>
      <Box sx={{ width: '100%' }}>
        <Box sx={wrapperStyle}>
          <Typography
            gutterBottom
            variant="h1"
            fontWeight={700}
            fontSize="5rem"
            letterSpacing="0.1em"
          >
            {APP_CONFIGS.NAME}
          </Typography>
          <Typography variant="h4" fontSize="2em" letterSpacing="0.05em">
            On-chain low-code framework for structuring socio-economic systems
          </Typography>
        </Box>

        {!account && (
          <Box mt={4} textAlign="center">
            <Typography fontSize="1.2em" letterSpacing="0.02em">
              Connect wallet to explore mDAOs <ConnectButton sx={{ ml: 4 }} />
            </Typography>
          </Box>
        )}
        {account && (
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid #333',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" mr={1}>
              Need some test tokens?
            </Typography>
            <br />
            <Typography sx={{ marginTop: '5px' }}>
              Request some from the{' '}
              <Link href={`https://faucet.polygon.technology/`} target="_blank">
                Mumbai Testnet Faucet
              </Link>
              {/* <Link href={`https://optimismfaucet.xyz/`} passHref>
                <MuiLink underline="none" target="_blank">
                  Optimistic Kovan Faucet
                </MuiLink>
              </Link> */}
            </Typography>
          </Box>
        )}

        <Typography variant="h4" sx={{ mt: 4 }}>
          [WIP] This is a demo dApp for the solidify low-code protocol
        </Typography>
        <Box>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Featuring soul-systems - a cluster of composible primitives
            structured around a soulbound contract that allows you to
          </Typography>
          <ul>
            <li>Mint SBT profiles as wallet abstraction</li>
            <li>Create Games as a context containing SBT profiles</li>
            <li>Set up Rules and design an interaction flow</li>
            <li>
              Create automated incentives and attach them to the rules of the
              context
            </li>
            <li>
              Modarate your soul-system. Ban bad actors, and recover lost or
              stolen assets (Safe NFTs)
            </li>
            <li>Track experience & reputation</li>
            <li>
              Extend games with customized affordences that fit your specific
              requirements with minimal development effort
            </li>
          </ul>
        </Box>
      </Box>
    </Layout>
  );
}
