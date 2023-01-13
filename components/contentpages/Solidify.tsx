import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import ImageBox from 'components/utils/ImageBox';
import FaucetCallout from 'components/web3/FaucetCallout';

/**
 * Home Page
 */
export default function SolidifyLanding(): JSX.Element {
  const { account } = useContext(Web3Context);

  return (
    <>
      <ImageBox
        src="/images/futuristic_tower1.jpg"
        sx={{
          height: { xs: '160px', md: '260px' },
        }}
      />
      <Box>
        <Box
          sx={{
            textAlign: 'center',
            px: { xs: 2, md: 4 },
            pt: { xs: 2, md: 4 },
          }}
        >
          <Typography
            gutterBottom
            variant="h1"
            fontWeight={700}
            letterSpacing="0.1em"
            sx={{ fontSize: { sm: '5rem', xs: '3rem' } }}
          >
            {/* {APP_CONFIGS.NAME} */}
            SoulSystem Boilerplate
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem' } }}
            letterSpacing="0.02em"
          >
            The magic of composable fully decentralized socio-economic systems
            with no-code
          </Typography>
        </Box>
        {/* {!account && (
          <Box mt={4} textAlign="center">
            <Typography fontSize="1.2em" letterSpacing="0.02em">
              Connect wallet to explore mDAOs <ConnectButton sx={{ ml: 4 }} />
            </Typography>
          </Box>
        )} */}

        <FaucetCallout minBalance={0.1} />

        <Box>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Featuring SoulSystems - a cluster of composible primitives
            structured around an SBT contract that allows you to
          </Typography>
          <ul>
            <li>Use Soulbound NFT profiles as wallet abstraction</li>
            <li>Create Organiztions</li>
            <ul>
              <li>
                Assign NFTs as organizational roles and manage permissions
              </li>
              <li>
                Track experience, reputation, contribution & equity over
                different organizations in one place
              </li>
            </ul>
            <li>Create automated incentives procedures with custom rules</li>
            <ul>
              <li>Set up rules and design a interaction flows</li>
              <li>Automatically reward actions with all kinds of Tokens</li>
            </ul>
            <li>SoulSystem moderation</li>
            <ul>
              <li>Ban bad actors</li>
              <li>recover lost or stolen assets (Safe NFTs)</li>
            </ul>
            <li>
              Fully composible, extendable, and compatible with token standards
            </li>
          </ul>
        </Box>
      </Box>
    </>
  );
}
