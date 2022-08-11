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
 */
// export const resolveLink = (url: any) => (!url || !url.includes("ipfs://")) ? url : url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
// export const resolveLink = (url: any) => (!url || !url.includes("ipfs://")) ? url : url.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
// export const resolveLink = (url: any) => (!url || !url.includes("ipfs://")) ? url : url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
export const resolveLink = (url: any) =>
  !url || !url.includes('ipfs://')
    ? url
    : url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
// : url.replace('ipfs://', 'https://ipfs.infura.io/ipfs/'); //Error: "Public Gateway Is Not Supported Anymore - Setup a Dedicated Gatewa"
