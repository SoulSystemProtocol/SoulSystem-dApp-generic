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
