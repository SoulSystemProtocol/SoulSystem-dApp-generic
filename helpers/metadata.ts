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

//Get Trait Value by Key
export const getMetadataTraitValue = (metadata: any, key: string) => {
  // return getTraitValue(item?.uriData?.attributes, key);
  return getTraitValue(metadata?.attributes, key);
};
