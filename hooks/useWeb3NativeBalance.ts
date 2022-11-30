import { Web3Context } from 'contexts/Web3Context';
import { useContext, useState, useEffect } from 'react';
import useError from './useError';

/**
 * Hook to Get Native Balance of an Address.
 */
export default function useWeb3NativeBalance(address: string): {
  balance: string | null;
} {
  const { getBalance } = useContext(Web3Context);
  const { handleError } = useError();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    console.warn("Get Addr for Balance", { address });
    if (address && getBalance) {
      getBalance(address)
        .then((fund: string) => setBalance(fund))
        .catch((error: any) => {
          setBalance(null);
          handleError(error, true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, getBalance]);

  return { balance };
}