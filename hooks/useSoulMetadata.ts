import { useEffect, useMemo, useRef, useState } from 'react';
import {
  hydrateSoulMetadata,
  hydrateSoulsMetadata,
  shouldHydrateSoulMetadata,
} from 'services/indexer/metadataHydration';
import type { SoulEntity } from 'services/indexer/types';

type HydratedSoulMetadataState<T extends SoulEntity | null> = {
  soul: T;
  isHydrating: boolean;
};

type HydratedSoulsMetadataState<T extends SoulEntity[]> = {
  souls: T;
  isHydrating: boolean;
};

export function useHydratedSoulMetadata<T extends SoulEntity | null>(
  soul: T,
): T {
  return useHydratedSoulMetadataState(soul).soul;
}

export function useHydratedSoulMetadataState<T extends SoulEntity | null>(
  soul: T,
): HydratedSoulMetadataState<T> {
  const [state, setState] = useState<HydratedSoulMetadataState<T>>({
    soul,
    isHydrating: false,
  });
  const hydrationKey = useMemo(() => getSoulHydrationKey(soul), [soul]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const isHydrating = shouldHydrateSoulMetadata(soul);
    setState({ soul, isHydrating });

    if (!soul || !isHydrating) return;

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
        setState({ soul: nextSoul as T, isHydrating: false });
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;

        console.warn('[IPFS] Soul metadata hook failed', {
          id: soul.id,
          message: error instanceof Error ? error.message : String(error),
        });
        setState({ soul, isHydrating: false });
      });
    // hydrationKey tracks the meaningful soul fields without refetching on
    // every parent render that creates a new object with the same content.
  }, [hydrationKey]);

  return state;
}

export function useHydratedSoulsMetadata<T extends SoulEntity[]>(souls: T): T {
  return useHydratedSoulsMetadataState(souls).souls;
}

export function useHydratedSoulsMetadataState<T extends SoulEntity[]>(
  souls: T,
): HydratedSoulsMetadataState<T> {
  const [state, setState] = useState<HydratedSoulsMetadataState<T>>({
    souls,
    isHydrating: false,
  });
  const hydrationKey = useMemo(() => getSoulsHydrationKey(souls), [souls]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const isHydrating = souls.some(shouldHydrateSoulMetadata);
    setState({ souls, isHydrating });

    if (!souls.length || !isHydrating) return;

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
        setState({ souls: nextSouls as T, isHydrating: false });
      })
      .catch((error) => {
        if (requestIdRef.current !== requestId) return;

        console.warn('[IPFS] Soul metadata collection hook failed', {
          count: souls.length,
          message: error instanceof Error ? error.message : String(error),
        });
        setState({ souls, isHydrating: false });
      });
  }, [hydrationKey]);

  return state;
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
