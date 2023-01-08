import { resolveLink } from 'helpers/IPFS';
import { truncate } from 'lodash';

/**
 * Get first name and last name of soul.
 */
export function soulName(soul: any, length: number = 36): string {
  if (soul?.name) return soul.name;
  if (soul?.metadata?.name) return soul.metadata.name;
  let firstLastName = 'Anonymous';
  if (soul?.uriFirstName || soul?.uriLastName) {
    firstLastName = (soul.uriFirstName || '') + ' ' + (soul.uriLastName || '');
  }
  return truncate(firstLastName, { length: length });
}

/**
 * Get main image of soul.
 */
export function soulImage(soul: any): string {
  if (soul?.metadata?.image) return resolveLink(soul.metadata.image);
  if (soul?.metadata?.image) return resolveLink(soul.metadata.image);
  return soul?.uriImage ? resolveLink(soul.uriImage) : '';
}

/**
 * Generate soul link.
 */
export function soulLink(soul: any): string {
  return `/soul/${soul.id}`;
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
