import { useEffect, useMemo, useRef, useState } from 'react';
import {
  hydrateSoulMetadata,
  hydrateSoulsMetadata,
} from 'services/indexer/metadataHydration';
import type { SoulEntity } from 'services/indexer/types';

export function useHydratedSoulMetadata<T extends SoulEntity | null>(
  soul: T,
): T {
  const [hydratedSoul, setHydratedSoul] = useState<T>(soul);
  const hydrationKey = useMemo(() => getSoulHydrationKey(soul), [soul]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setHydratedSoul(soul);

    if (!soul) return;

    console.info('[IPFS] Soul metadata hook scheduled', {
      id: soul.id,
      uri: soul.uri,
    });

    void hydrateSoulMetadata(soul)
      .then((nextSoul) => {
        if (requestIdRef.current !== requestId || !nextSoul) return;

        console.info('[IPFS] Soul metadata hook updated', {
          id: nextSoul.id,
          hasMetadata: !!nextSoul.metadata,
        });
        setHydratedSoul(nextSoul as T);
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;

        console.warn('[IPFS] Soul metadata hook failed', {
          id: soul.id,
          message: error instanceof Error ? error.message : String(error),
        });
      });
    // hydrationKey tracks the meaningful soul fields without refetching on
    // every parent render that creates a new object with the same content.
  }, [hydrationKey]);

  return hydratedSoul;
}

export function useHydratedSoulsMetadata<T extends SoulEntity[]>(souls: T): T {
  const [hydratedSouls, setHydratedSouls] = useState<T>(souls);
  const hydrationKey = useMemo(() => getSoulsHydrationKey(souls), [souls]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setHydratedSouls(souls);

    if (!souls.length) return;

    console.info('[IPFS] Soul metadata collection hook scheduled', {
      count: souls.length,
      ids: souls.map((soul) => soul.id),
    });

    void hydrateSoulsMetadata(souls)
      .then((nextSouls) => {
        if (requestIdRef.current !== requestId) return;

        console.info('[IPFS] Soul metadata collection hook updated', {
          count: nextSouls.length,
          hydratedCount: nextSouls.filter((soul) => !!soul.metadata).length,
        });
        setHydratedSouls(nextSouls as T);
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;

        console.warn('[IPFS] Soul metadata collection hook failed', {
          count: souls.length,
          message: error instanceof Error ? error.message : String(error),
        });
      });
  }, [hydrationKey]);

  return hydratedSouls;
}

function getSoulsHydrationKey(souls: SoulEntity[]): string {
  return souls.map(getSoulHydrationKey).join('|');
}

function getSoulHydrationKey(soul: SoulEntity | null): string {
  if (!soul) return 'empty';

  return [
    soul.id,
    soul.owner,
    soul.uri,
    soul.name,
    soul.uriImage,
    soul.uriFirstName,
    soul.uriLastName,
    getMetadataKey(soul.metadata),
  ]
    .map((part) => String(part ?? ''))
    .join(':');
}

function getMetadataKey(metadata: SoulEntity['metadata']): string {
  if (!metadata || typeof metadata === 'string') return String(metadata ?? '');

  try {
    return JSON.stringify(metadata);
  } catch {
    return 'metadata-object';
  }
}
