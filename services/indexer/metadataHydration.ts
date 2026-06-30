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

  console.info('[IPFS] Loading metadata', {
    id: soul.id,
    uri: soul.uri,
  });

  const metadata = await fetchIpfsJson(soul.uri, soul.id);
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    console.warn('[IPFS] Metadata gateways exhausted', {
      id: soul.id,
      uri: soul.uri,
    });
    return soul;
  }

  console.info('[IPFS] Hydrated soul metadata', {
    id: soul.id,
    name: metadata.name,
  });

  return mergeSoulMetadata(soul, metadata);
}

export async function hydrateSoulsMetadata(
  souls: SoulEntity[],
): Promise<SoulEntity[]> {
  return Promise.all(
    souls.map(async (soul) => (await hydrateSoulMetadata(soul)) ?? soul),
  );
}

export function shouldHydrateSoulMetadata(soul: SoulEntity | null): boolean {
  return !!soul && !hasMetadata(soul.metadata) && !!soul.uri;
}

export function scheduleSoulMetadataHydration(
  soul: SoulEntity | null,
  onHydrated: (soul: SoulEntity) => void,
): void {
  void hydrateSoulMetadata(soul)
    .then((hydratedSoul) => {
      if (hydratedSoul) onHydrated(hydratedSoul);
    })
    .catch((error) => {
      console.warn('[IPFS] Scheduled metadata hydration failed', {
        id: soul?.id,
        message: error instanceof Error ? error.message : String(error),
      });
    });
}

export function scheduleSoulsMetadataHydration(
  souls: SoulEntity[],
  onHydrated: (souls: SoulEntity[]) => void,
): void {
  void hydrateSoulsMetadata(souls)
    .then(onHydrated)
    .catch((error) => {
      console.warn('[IPFS] Scheduled collection hydration failed', {
        count: souls.length,
        message: error instanceof Error ? error.message : String(error),
      });
    });
}

export function scheduleSoulsMetadataHydrationByItem(
  souls: SoulEntity[],
  onHydrated: (soul: SoulEntity) => void,
  onSettled?: (id: string) => void,
): void {
  souls.forEach((soul) => {
    if (!shouldHydrateSoulMetadata(soul)) {
      if (soul) onSettled?.(soul.id);
      return;
    }

    void hydrateSoulMetadata(soul)
      .then((hydratedSoul) => {
        if (hydratedSoul) onHydrated(hydratedSoul);
      })
      .catch((error) => {
        console.warn('[IPFS] Scheduled item metadata hydration failed', {
          id: soul.id,
          message: error instanceof Error ? error.message : String(error),
        });
      })
      .finally(() => {
        onSettled?.(soul.id);
      });
  });
}

async function fetchIpfsJson(
  uri: string,
  id: string,
): Promise<MetadataRecord | null> {
  if (typeof fetch !== 'function') {
    console.warn('[IPFS] Fetch API unavailable', { id, uri });
    return null;
  }

  const urls = getJsonUrls(uri);
  for (let gatewayIndex = 0; gatewayIndex < urls.length; gatewayIndex++) {
    const url = urls[gatewayIndex];
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn('[IPFS] Metadata gateway failed', {
          id,
          gatewayIndex,
          status: response.status,
          statusText: response.statusText,
          url,
        });
        continue;
      }

      const metadata = await response.json();
      console.info('[IPFS] Loaded metadata', {
        id,
        gatewayIndex,
        url,
      });
      return metadata;
    } catch (error) {
      console.warn('[IPFS] Metadata gateway threw', {
        id,
        gatewayIndex,
        message: error instanceof Error ? error.message : String(error),
        url,
      });
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
    return trimmedUri
      .slice(ipfsPathIndex + '/ipfs/'.length)
      .replace(/^\/+/, '');
  }

  return null;
}

function hasMetadata(metadata: SoulEntity['metadata']): boolean {
  if (!metadata) return false;
  if (typeof metadata === 'string') {
    const normalizedMetadata = metadata.trim().toLowerCase();
    return normalizedMetadata.length > 0 && normalizedMetadata !== '0x';
  }
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
