import { addressToShortAddress } from 'utils/converters';
import { CopyIcon } from 'components/icons';

export default function AddressHash(address: string) {
  return (<>
    {addressToShortAddress(address)}
    <CopyIcon
      onClick={() => {
        navigator.clipboard.writeText(address);
        // setIsClicked(true);
      }}
    />
  </>);
}