import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'components/utils/Link';
import { LogoSVG } from 'components/icons';
import { getChainData } from 'components/web3/chains/ChainsData';

/**
 * Header Logo
 */
export default function HeaderLogo(): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Link href="/" sx={{ mt: '4px' }}>
        {/* <Typography>{process.env.NEXT_PUBLIC_APP_NAME}</Typography> */}
        <LogoSVG height={42} width={42} fill="url(#linearColors)" />
      </Link>

      <Typography
        variant="caption"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          color: 'text.secondary',
          pl: 1,
        }}
      >
        {process.env.NEXT_PUBLIC_FEATURE_DEV
          ? 'v' + process.env.NEXT_PUBLIC_VERSION
          : !getChainData().live
          ? 'testnet'
          : ''}
      </Typography>
    </Box>
  );
}
