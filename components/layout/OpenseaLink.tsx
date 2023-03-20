import { useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'components/utils/Link';

/**
 * [WIP] OpenSea Links (With Image)
 */
export default function OpenseaLink({
  contract,
  token,
}: {
  contract: string;
  token: string;
}): JSX.Element {
  const { curChainData } = useContext(Web3Context);

  console.warn('curChainData', curChainData);

  return (
    <>
      {curChainData?.openSeaUrl && (
        <Link href={`${contract}/${token}`}>OpenSea</Link>
      )}
    </>
  );
}
