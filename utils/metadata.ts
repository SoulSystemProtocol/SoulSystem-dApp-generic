/**
 * Get a trait value from metadata attributes.
 */
export function getTraitValue(
  attributes: Array<object> | null,
  traitType: string,
): string | null {
  const attribute: any = attributes?.find(
    (attribute: any) => attribute?.trait_type === traitType,
  );
  return attribute?.value || null;
}

/**
 * Resolve IPFS Links
 *
 * https://dweb.link/ipfs/
 * https://cloudflare-ipfs.com/ipfs/
 * https://gateway.ipfs.io/ipfs/
 * https://ipfs.moralis.io:2053/ipfs/
 */
export const resolveLink = (url: any) => {
  //[FIX] Remove Hardcoded Infura gateway
  if (!!url) url = url.replace('https://ipfs.infura.io/ipfs/', 'ipfs://');
  return !url || !url.includes('ipfs://')
    ? url
    : url.replace('ipfs://', 'https://grid.infura-ipfs.io/ipfs/');
  // : url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
  // : url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
  // : url.replace('ipfs://', 'https://ipfs.infura.io/ipfs/'); //Error: "Public Gateway Is Not Supported Anymore - Setup a Dedicated Gateway"
};

//Get Trait Value by Key
export const getMetadataTraitValue = (metadata: any, key: string) => {
  // return getTraitValue(item?.uriData?.attributes, key);
  return getTraitValue(metadata?.attributes, key);
};
