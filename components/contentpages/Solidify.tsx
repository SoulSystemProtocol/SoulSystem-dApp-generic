import { useContext } from 'react';
import Link from 'components/utils/Link';
import { Box, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import ImageBox from 'components/utils/ImageBox';
import { getChainData } from 'components/web3/chains/ChainsData';

/**
 * Home Page
 */
export default function SolidifyLanding() {
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
            color: '#fff',
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
            Soul-System Protocol Demo
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem' } }}
            letterSpacing="0.02em"
          >
            You can compose fully decentralized socio-economic systems without
            having to write any code
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
        >
          This is a WIP demo dApp for the solidify low-code protocol
        </Typography>

        {/* {!account && (
          <Box mt={4} textAlign="center">
            <Typography fontSize="1.2em" letterSpacing="0.02em">
              Connect wallet to explore mDAOs <ConnectButton sx={{ ml: 4 }} />
            </Typography>
          </Box>
        )} */}
        {account && getChainData()?.faucetURL && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              justifyContent: 'center',
              border: '1px solid #333',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            {/* //TODO: Check account balance */}
            <Typography variant="h6" mb={1}>
              Need some test tokens?
            </Typography>
            <Typography sx={{ marginTop: '5px' }}>
              Request some from the{' '}
              <Link href={getChainData()?.faucetURL} target="_blank">
                {getChainData()?.name} Testnet Faucet
              </Link>
            </Typography>
          </Box>
        )}

        <Box>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Featuring soul-systems - a cluster of composible primitives
            structured around an SBT contract that allows you to
          </Typography>
          <ul>
            <li>Mint SBT profiles as wallet abstraction</li>
            <li>Create Organiztions</li>
            <ul>
              <li>Assign organizational roles and permissions via NFTs</li>
              <li>Track experience, reputation, contribution & equity</li>
            </ul>
            <li>Create automated incentives procedures by custom rules</li>
            <ul>
              <li>Set up rules and design an interaction flow</li>
              <li>
                Automatically reward participants with all kinds of Tokens
              </li>
            </ul>
            <li>Soul-system moderation</li>
            <ul>
              <li>
                Ban bad actors, and recover lost or stolen assets (Safe NFTs)
              </li>
            </ul>
            <li>
              Fully composible, extendable, and compatible with all token
              standards
            </li>
          </ul>
        </Box>
      </Box>
    </>
  );
}
