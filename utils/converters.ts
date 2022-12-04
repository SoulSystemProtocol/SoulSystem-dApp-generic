import { PROC_STAGE, GAME_ROLE } from 'constants/contracts';
import { truncate } from 'lodash';
import _ from 'lodash';
import { resolveLink } from 'helpers/IPFS';

/**
 * Convert hex string to json.
 */
export function hexStringToJson(hexString: string): any {
  if (!hexString || hexString.length === 0) {
    return null;
  }
  try {
    var hex = hexString.toString();
    if (hex.startsWith('0x')) {
      hex = hex.substring(2);
    }
    var str = decodeURIComponent(
      hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'),
    );
    return JSON.parse(str);
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Trim string
 */
export function cutoff(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1).trim() + '…' : str;
}

/**
 * Convert "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1" to "0x430...c4b1".
 */
export function addressToShortAddress(address: string): string {
  let shortAddress = address;
  if (address.length > 10) {
    shortAddress = `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  }
  return shortAddress.toLowerCase();
}

/**
 * Get first name and last name of soul.
 */
export function soulToFirstLastNameString(soul: any, length = 36): string {
  if (soul?.name) return soul.name;
  if (soul?.metadata?.name) return soul.metadata.name;
  let firstLastName = 'Anonymous';
  if (soul?.uriFirstName || soul?.uriLastName) {
    firstLastName = (soul.uriFirstName || '') + ' ' + (soul.uriLastName || '');
  }
  return truncate(firstLastName, { length: length });
}

/**
 * Get iamge of soul.
 */
export function soulImage(soul: any): string {
  if (soul?.metadata?.image) return resolveLink(soul.metadata.image);
  if (soul?.metadata?.image) return resolveLink(soul.metadata.image);
  return soul?.uriImage ? resolveLink(soul.uriImage) : '';
}

/**
 * Convert task stage to readable string.
 */
export function taskStageToString(task: any): string {
  for (let stageName in PROC_STAGE) {
    if (PROC_STAGE[stageName] == task.stage) return stageName;
  }
  console.warn('Unhandled Task Stage:' + task.stage, task);
  return 'Open';
}

/**
 * Format Action Name (subject, verb, object, tool)
 */
export function formatActionName(action: {
  subject: any;
  verb: any;
  object: any;
  tool: any;
}): string {
  let ret = '';
  if (action.subject) ret += action.subject;
  if (action.verb) ret += ' ' + action.verb;
  if (action.object) ret += ' ' + action.object;
  if (action.tool) ret += ' using a ' + action.tool;
  return _.capitalize(ret);
}

/**
 * Fetch Role Name by ID
 */
export function roleIdToName(role: string): string | undefined {
  console.error("CALLED DEPRECATED FUNCTION: 'roleIdToName'");
  return Object.values(GAME_ROLE).find((element) => element.id == role)?.name;
}
