import { ethers } from 'ethers';
import { analyticsCatchErrorEvent } from 'utils/analytics';
import { useBalance } from 'wagmi';

/**
 * Display Native Balance
 */
export default function NativeBalanceDisplay({
  address,
}: {
  address: any;
}): JSX.Element {
  const { data: balance, isError, isLoading } = useBalance({ address });
  if (!ethers.utils.isAddress(address)) {
    console.error('Not a Valid Address', address);
    analyticsCatchErrorEvent(new Error('Not a Valid Address'), {
      type: 'invalid address',
      data: { address },
    });
  }
  return (
    <>
      {balance?.formatted} {balance?.symbol}
    </>
  );
}
