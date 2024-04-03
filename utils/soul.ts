import { DEFAULT_COVER, DEFAULT_IMAGE } from 'constants/texts';
import { resolveLink } from 'helpers/IPFS';
import { MetaAttrHelper } from 'helpers/MetaAttrHelper';
import __ from 'helpers/__';
import { truncate } from 'lodash';

/**
 * Get first name and last name of soul.
 */
export function soulName(soul: any, length: number = 36): string {
  if (soul?.name) return soul.name;
  if (soul?.metadata?.name) return soul.metadata.name;
  if (!!soul?.uriFirstName || !!soul?.uriLastName) {
    let name = (soul.uriFirstName || '') + ' ' + (soul.uriLastName || '');
    return truncate(name, { length: length });
  }
  if (soul?.metadata?.attributes) {
    //Backwards compatibility
    return MetaAttrHelper.extractName(soul.metadata.attributes);
  }
  //No Name
  return 'Anonymous';
}

/**
 * Get main image of soul.
 */
export function soulImage(soul: any): string {
  if (soul?.image) return resolveLink(soul.image);
  if (soul?.metadata?.image) return resolveLink(soul.metadata.image);
  return soul?.uriImage ? resolveLink(soul.uriImage) : DEFAULT_IMAGE;
}

/**
 * Get soul's cover image.
 */
export function soulCover(soul: any): string {
  return resolveLink(soul?.metadata?.cover) || DEFAULT_COVER;
}

/**
 * Get soul's description.
 */
export function soulDescription(soul: any): string {
  return soul?.metadata?.description
    ? soul.metadata.description
    : MetaAttrHelper.extractValue(soul?.metadata?.attributes, 'Description');
}

/**
 * Generate soul link.
 */
export function soulLink(soul: any, guid: boolean = false): string {
  //Validate
  if (!soul.owner) console.error('Soul object missing owner', { soul });
  // if(!guid) return soul.handle
  return `/soul/${isLostSoul(soul.owner) ? soul.id : soul.owner}`;
}

/**
 * Structure a faux soul entity for optimistic updates
 */
export function genFauxSoul(metadata: any, additional: any = {}): any {
  const soulFaux: any = {
    metadata,
    name: soulName({ metadata }),
    image: soulImage({ metadata }),
    ...additional,
  };
  return soulFaux;
}

/**
 * Check if soul is lost (not owned)
 */
export const isLostSoul = (address: string): boolean =>
  __.matchAddr(address, process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS);
