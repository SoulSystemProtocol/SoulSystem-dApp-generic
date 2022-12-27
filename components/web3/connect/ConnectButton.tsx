import { useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import { Button, SxProps } from '@mui/material';

/**
 * Wallet Connect Button
 */
export default function ConnectButton({
  sx = {},
}: {
  sx?: SxProps;
}): JSX.Element {
  const { account, connectWallet, disconnectWallet } = useContext(Web3Context);

  if (!account) {
    return (
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          connectWallet?.();
        }}
        sx={{ cursor: 'pointer', borderRadius: '16px', ...sx }}
      >
        Connect Wallet
      </Button>
    );
  } else {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => disconnectWallet?.()}
        sx={{ cursor: 'pointer', borderRadius: '16px', ...sx }}
      >
        Disconnect Wallet
      </Button>
    );
  }
}
