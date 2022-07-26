import { addressToShortAddress } from 'utils/converters';
import { CopyIcon } from 'components/icons';

export default function AddressHash({
  address,
}: {
  address: string;
}): JSX.Element {
  if (!address) return <></>;
  return (
    <>
      {addressToShortAddress(address)}
      <CopyIcon
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
      />
    </>
  );
}
