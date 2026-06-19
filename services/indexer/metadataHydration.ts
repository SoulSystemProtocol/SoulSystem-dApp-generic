import { MetaAttrHelper } from 'helpers/MetaAttrHelper';
import type { SoulEntity } from './types';

const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
];

type MetadataRecord = Record<string, any>;

export async function hydrateSoulMetadata(
  soul: SoulEntity | null,
): Promise<SoulEntity | null> {
  if (!soul || hasMetadata(soul.metadata) || !soul.uri) return soul;

  const metadata = await fetchIpfsJson(soul.uri);
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return soul;
  }

  return mergeSoulMetadata(soul, metadata);
}

export async function hydrateSoulsMetadata(
  souls: SoulEntity[],
): Promise<SoulEntity[]> {
  return Promise.all(
    souls.map(async (soul) => (await hydrateSoulMetadata(soul)) ?? soul),
  );
}

async function fetchIpfsJson(uri: string): Promise<MetadataRecord | null> {
  if (typeof fetch !== 'function') return null;

  for (const url of getJsonUrls(uri)) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      return await response.json();
    } catch {
      // Try the next gateway. Metadata hydration is a fallback, not a query blocker.
    }
  }

  return null;
}

function getJsonUrls(uri: string): string[] {
  const ipfsPath = getIpfsPath(uri);
  if (!ipfsPath) return [uri];

  return IPFS_GATEWAYS.map((gateway) => `${gateway}${ipfsPath}`);
}

function getIpfsPath(uri: string): string | null {
  const trimmedUri = uri.trim();

  if (trimmedUri.startsWith('ipfs://')) {
    return trimmedUri
      .replace(/^ipfs:\/\//, '')
      .replace(/^ipfs\//, '')
      .replace(/^\/+/, '');
  }

  const ipfsPathIndex = trimmedUri.indexOf('/ipfs/');
  if (ipfsPathIndex >= 0) {
    return trimmedUri.slice(ipfsPathIndex + '/ipfs/'.length).replace(/^\/+/, '');
  }

  return null;
}

function hasMetadata(metadata: SoulEntity['metadata']): boolean {
  if (!metadata) return false;
  if (typeof metadata === 'string') return metadata.trim().length > 0;
  return true;
}

function mergeSoulMetadata(
  soul: SoulEntity,
  metadata: MetadataRecord,
): SoulEntity {
  const attributes = Array.isArray(metadata.attributes)
    ? metadata.attributes
    : undefined;

  return {
    ...soul,
    metadata,
    name: soul.name || metadata.name,
    uriImage: soul.uriImage || metadata.image,
    uriFirstName:
      soul.uriFirstName ||
      (attributes ? MetaAttrHelper.extractValue(attributes, 'First Name') : ''),
    uriLastName:
      soul.uriLastName ||
      (attributes ? MetaAttrHelper.extractValue(attributes, 'Last Name') : ''),
  };
}
