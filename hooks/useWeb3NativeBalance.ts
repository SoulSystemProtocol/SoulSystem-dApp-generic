import { Web3Context } from 'contexts/Web3Context';
import { useContext, useState, useEffect } from 'react';
import useError from './useError';

/** [DEPRECATED] Use WGMI Balance instead
 * Hook to Get Native Balance of an Address.
 */
export default function useWeb3NativeBalance(address: string): {
  balance: string | null;
} {
  const { getBalance } = useContext(Web3Context);
  const { handleError } = useError();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (address && getBalance) {
      getBalance(address)
        .then((balance: string) => setBalance(balance))
        .catch((error: any) => {
          setBalance(null);
          handleError(error, true);
        });
    } else setBalance(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, getBalance]);

  return { balance };
}
