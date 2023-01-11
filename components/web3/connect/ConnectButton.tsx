import { LoadingButton } from '@mui/lab';
import { Button, SxProps } from '@mui/material';
import { useAccount, useDisconnect } from 'wagmi';
// import { Web3Button } from '@web3modal/react';
import { useWeb3Modal } from '@web3modal/react';

/**
 * Wallet Connect Button
 */
export default function ConnectButton({
  sx = {},
}: {
  sx?: SxProps;
}): JSX.Element {
  const { isOpen, open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <>
        <LoadingButton
          variant="contained"
          size="small"
          // disabled={!connector.ready}
          loading={isOpen}
          // loadingPosition="start"
          // startIcon={<Save />}
          onClick={() => {
            open();
          }}
          sx={{
            cursor: 'pointer',
            borderRadius: '16px',
            px: '24px',
            whiteSpace: 'nowrap',
            ...sx,
          }}
        >
          {isOpen ? <>&nbsp; Connecting...</> : 'Connect Wallet'}
        </LoadingButton>
        {/* <Web3Button icon="hide" label="Connect Wallet" balance="show" /> */}
      </>
    );
  } else {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => disconnect()}
        sx={{
          cursor: 'pointer',
          borderRadius: '16px',
          whiteSpace: 'nowrap',
          ...sx,
        }}
      >
        Disconnect Wallet
      </Button>
    );
  }
}
