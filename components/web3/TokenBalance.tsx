import { ethers } from 'ethers';
import { Web3Context } from 'contexts/Web3Context';
import { useContext, useEffect, useState } from 'react';
import ERC20_ABI from 'contracts/abi/ERC20_Simple.json';
import { Stack } from '@mui/material';

/**
 * ERC20 Token Balance for multiple tokens
 */
export default function TokenBalance({ account, sx = {} }: any): JSX.Element {
  const { curChainData } = useContext(Web3Context);

  return (
    <>
      {curChainData.ERC20.map((token: any) => {
        return (
          <Stack
            direction="row"
            key={token.address}
            spacing={1}
            sx={{ display: 'inline' }}
          >
            <TokenBalanceSingle account={account} token={token.address} />
            <span> {token.label}</span>
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
  const { provider } = useContext(Web3Context);

  const getSingleTokenBalance = async (token: string, account: string) => {
    const contract = new ethers.Contract(token, ERC20_ABI, provider);
    const res = await contract.balanceOf(account);
    return res;
  };

  useEffect(() => {
    getSingleTokenBalance(token, account).then((res) => {
      console.warn('Got balance: ', res, ethers.utils.formatEther(res));
      setBalance(ethers.utils.formatEther(res));
    });
  }, [account, token]);

  if (!account || !token) {
    console.error('No account or token', { account, token });
    return <></>;
  }
  return <>{balance}</>;
}
