import { ethers } from 'ethers';
import { Web3Context } from 'contexts/Web3Context';
import useError from 'hooks/useError';
import { useContext, useState, useEffect } from 'react';

/**
 * A component Account's Balance
 */
export default function AccountBalance({ address }: any) {
  const [balance, setBalance] = useState('_');
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { handleError } = useError();

  useEffect(() => {
    if (!!address && !!provider && isNetworkChainIdCorrect) {
      provider
        .getBalance(address)
        .then((result: ethers.BigNumberish) => {
          // convert a currency unit from wei to ether
          const balanceInEth = ethers.utils.formatEther(result);
          // console.log(`balance for account:${address} is ${balanceInEth} ${process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME}`);
          setBalance(balanceInEth);
        })
        .catch((error: Error) => handleError(error, true));
    } else setBalance('?');
  }, [address, provider, isNetworkChainIdCorrect]);

  return <>{balance}</>;
}
