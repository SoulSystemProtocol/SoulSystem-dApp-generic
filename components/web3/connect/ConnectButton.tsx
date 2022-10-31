import { useContext } from 'react';
import { Web3Context } from 'contexts/web3';
import { Button } from '@mui/material';

/**
 * Wallet Connect Button
 */
export default function ConnectButton(): JSX.Element {
  const { account, connectWallet, disconnectWallet } = useContext(Web3Context);

  if (!account) {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          connectWallet?.();
        }}
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
      >
        Disconnect Wallet
      </Button>
    );
  }
}
