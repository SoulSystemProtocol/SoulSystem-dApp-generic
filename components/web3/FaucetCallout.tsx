import { useTheme, Box, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'components/utils/Link';
import { useContext } from 'react';
import { getChainData } from './chains/ChainsData';
import { useBalance } from 'wagmi';

/**
 * Faucet Callout
 */
export default function FaucetCallout({
  minBalance = 0.1,
}: {
  minBalance: number;
}): JSX.Element {
  const { account, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { data: balance } = useBalance({ address: account });
  const theme = useTheme();

  return (
    <>
      {account &&
        isNetworkChainIdCorrect &&
        getChainData()?.faucetURL &&
        balance?.formatted &&
        Number(balance?.formatted) < minBalance && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              justifyContent: 'center',
              // border: '1px solid #333',
              background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box`,
              borderRadius: '20px',
              border: '3px solid transparent',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" mb={1}>
              Your balance is low
            </Typography>
            <Typography sx={{ marginTop: '5px' }}>
              Get some free test tokens from the{' '}
              <Link href={getChainData()?.faucetURL} target="_blank">
                {getChainData()?.name} Testnet Faucet
              </Link>
            </Typography>
          </Box>
        )}
    </>
  );
}
