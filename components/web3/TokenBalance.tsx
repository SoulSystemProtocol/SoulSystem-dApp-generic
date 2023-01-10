import { ethers } from 'ethers';
import { Web3Context } from 'contexts/Web3Context';
import { useContext, useEffect, useState } from 'react';
import ERC20_ABI from 'contracts/abi/ERC20_Simple.json';
import { Box, Stack } from '@mui/material';
import { useProvider } from 'wagmi';
// import { useBalance } from 'wagmi';
import { ERC20 } from 'typechain-types/ERC20';

/** [UNUSED]
 * ERC20 Token Balance for multiple tokens
 */
export default function TokenBalance({ account, sx = {} }: any): JSX.Element {
  const { curChainData } = useContext(Web3Context);

  return (
    <>
      {curChainData?.ERC20?.map((token: any) => {
        return (
          <Stack
            direction="row"
            key={token.address}
            spacing={1}
            sx={{ display: 'inline' }}
          >
            <Box sx={{ display: 'inline' }}>
              <TokenBalanceSingle account={account} token={token.address} />
              <span> {token.label}</span>
            </Box>
          </Stack>
        );
      })}
    </>
  );
}

/**
 * ERC20 Token Balance
 */
export function TokenBalanceSingle({
  account,
  token,
}: {
  account: string;
  token: string;
}): JSX.Element {
  const [balance, setBalance] = useState<string>('0');
  const { networkChainId, isReady } = useContext(Web3Context);
  const provider = useProvider();
  /*
  const balanceWGMI = useBalance({
    address: account,
    token,
  });
  useEffect(() => {
    console.warn(
      'balanceWGMI: ' + balanceWGMI.data,
      balanceWGMI.error,
      balanceWGMI,
    );
  }, [balanceWGMI]);
  */
  const getSingleTokenBalance = async (token: string, account: string) => {
    const contract = new ethers.Contract(token, ERC20_ABI, provider) as ERC20;
    return contract.balanceOf(account);
  };

  useEffect(() => {
    getSingleTokenBalance(token, account)
      .then((res) => {
        setBalance(ethers.utils.formatEther(res));
      })
      .catch((err) => {
        console.error('Error getting token balance', {
          token,
          account,
          networkChainId,
          isReady,
          err,
        });
      });
  }, [account, token]);

  if (!account || !token) {
    console.error('No account or token', { account, token });
    return <></>;
  }
  return <>{balance}</>;
}
