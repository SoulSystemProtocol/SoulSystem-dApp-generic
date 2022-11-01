import { useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import { Button } from '@mui/material';

/**
 * Wallet Connect Button
 */
export default function ConnectButton({ sx = {} }): JSX.Element {
  const { account, connectWallet, disconnectWallet } = useContext(Web3Context);

  if (!account) {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          connectWallet?.();
        }}
        sx={{ cursor: 'pointer', ...sx }}
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
        sx={{ cursor: 'pointer', ...sx }}
      >
        Disconnect Wallet
      </Button>
    );
  }
}
