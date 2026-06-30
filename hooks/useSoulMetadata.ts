import { useEffect, useMemo, useRef, useState } from 'react';
import {
  hydrateSoulMetadata,
  scheduleSoulsMetadataHydrationByItem,
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
  hydratingById: Record<string, boolean>;
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
    hydratingById: {},
  });
  const hydrationKey = useMemo(() => getSoulsHydrationKey(souls), [souls]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const soulsPendingHydration = souls.filter(shouldHydrateSoulMetadata);
    const hydratingById = getSoulMetadataHydrationStateById(
      soulsPendingHydration,
    );
    const isHydrating = Object.keys(hydratingById).length > 0;
    setState({ souls, isHydrating, hydratingById });

    if (!souls.length || !isHydrating) return;

    console.info('[IPFS] Soul metadata collection hook scheduled', {
      count: souls.length,
      ids: soulsPendingHydration.map((soul) => soul.id),
    });

    scheduleSoulsMetadataHydrationByItem(
      soulsPendingHydration,
      (nextSoul) => {
        if (requestIdRef.current !== requestId) return;

        console.info('[IPFS] Soul metadata collection item updated', {
          id: nextSoul.id,
          hasMetadata: !!nextSoul.metadata,
        });
        setState((currentState) => ({
          ...currentState,
          souls: currentState.souls.map((currentSoul) =>
            currentSoul.id === nextSoul.id ? nextSoul : currentSoul,
          ) as T,
        }));
      },
      (settledId) => {
        if (requestIdRef.current !== requestId) return;

        setState((currentState) => {
          const nextHydratingById = { ...currentState.hydratingById };
          delete nextHydratingById[settledId];

          return {
            ...currentState,
            hydratingById: nextHydratingById,
            isHydrating: Object.keys(nextHydratingById).length > 0,
          };
        });
      },
    );
  }, [hydrationKey]);

  return state;
}

export function getSoulMetadataHydrationStateById(
  souls: SoulEntity[],
): Record<string, boolean> {
  return souls.reduce<Record<string, boolean>>((hydratingById, soul) => {
    if (shouldHydrateSoulMetadata(soul)) hydratingById[soul.id] = true;
    return hydratingById;
  }, {});
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
