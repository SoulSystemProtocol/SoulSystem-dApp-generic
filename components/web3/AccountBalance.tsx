import { ethers } from 'ethers';
import { Web3Context } from 'contexts/web3';
import useError from 'hooks/useError';
import { useContext, useState, useEffect } from 'react';

/**
 * A component Account's Balance
 */
export default function AccountBalance({ address }: any) {
  const [balance, setBalance] = useState('');
  const { provider } = useContext(Web3Context);
  const { handleError } = useError();

  useEffect(() => {
    if (address && provider) {
      provider
        .getBalance(address)
        .then((balance: any) => {
          // convert a currency unit from wei to ether
          const balanceInEth = ethers?.utils.formatEther(balance);
          // console.log(`balance: ${balanceInEth} ETH`);
          setBalance(balanceInEth);
        })
        .catch((error: Error) => handleError(error, true));
    } else setBalance('?');
  }, [address, provider]);

  console.log(`get balance:`, address);

  return <>{balance}</>;
}
