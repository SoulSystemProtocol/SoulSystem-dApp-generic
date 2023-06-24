import { useTheme, Box, Typography, Button } from '@mui/material';
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
  minBalance?: number;
}): JSX.Element {
  const { account, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { data: balance } = useBalance({ address: account });
  const theme = useTheme();

  console.log('getChainData()', getChainData());

  if (getChainData()?.key == '0x13881') {
    //Mumbai
    return <FaucetCalloutMumbai minBalance={minBalance} />;
  } else if (getChainData()?.key == '0x4E454152') {
    //Aurora
    return <FaucetCalloutAurora minBalance={minBalance} />;
  }
  return <></>;
}

/**
 * Faucet Callout - Aurora
 */
function FaucetCalloutAurora({
  minBalance = 0.1,
}: {
  minBalance?: number;
}): JSX.Element {
  const { account, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { data: balance } = useBalance({ address: account });
  const theme = useTheme();

  return (
    <>
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
        {/*balance?.formatted && Number(balance?.formatted) < minBalance && (
            <Typography variant="h6" mb={1}>
              Your balance is low 
            </Typography>
          )*/}
        <Typography variant="h6" mb={2}>
          No need to pay!
        </Typography>
        <Typography sx={{ marginTop: '5px' }}>
          Get your{' '}
          <Link href="https://aurora.plus/dashboard" target="_blank">
            <>Aurora + </>
          </Link>
          account and enjoy 50 free transactions every month
        </Typography>
        <Link href="https://aurora.plus/dashboard" target="_blank">
          <Button size="small" variant="contained" sx={{ mt: 4, mb: 2 }}>
            🤩 Claim Your Free Transactions Now! 🤩
          </Button>
        </Link>
      </Box>
    </>
  );
}

/**
 * Faucet Callout - Mumbai
 */
function FaucetCalloutMumbai({
  minBalance = 0.1,
}: {
  minBalance: number;
}): JSX.Element {
  const { account, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { data: balance } = useBalance({ address: account });
  const theme = useTheme();

  return (
    <>
      {getChainData()?.faucetURL && (
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
          {balance?.formatted && Number(balance?.formatted) < minBalance && (
            <Typography variant="h6" mb={1}>
              Your balance is low
            </Typography>
          )}
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
