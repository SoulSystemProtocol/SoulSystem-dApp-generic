# Sentio Indexer Migration

Status: Active
Date: 2026-06-30

## Decision

SoulSystem dApp uses Sentio hosted subgraph compatibility mode as the production indexer path for Aurora. The app consumes Sentio through the provider-neutral `services/indexer` client and the `NEXT_PUBLIC_INDEXER_GRAPHQL_URL` environment variable.

## Current Endpoint

```text
https://app.sentio.xyz//api/v1/graphql/toledoroy/soulsystem-aurora
```

## Runtime Contract

- Keep `NEXT_PUBLIC_INDEXER_GRAPHQL_URL` pointed at the Sentio Data Studio GraphQL endpoint.
- Keep `NEXT_PUBLIC_SUBGRAPH_API` empty unless a temporary legacy fallback is explicitly needed.
- Use `/admin` to verify indexer health after deployment or environment changes.
- Keep metadata hydration in the dApp/server layer through `services/indexer/metadataHydration.ts`.

## Completed

- Added the provider-neutral indexer client under `services/indexer`.
- Routed legacy `useSubgraph` and utility callers through the indexer client.
- Documented Sentio as the active hosted provider in `docs/PRD.md`.
- Removed the unused alternative indexer scaffold, parity script, and CI job.

## Pending Follow-Up

- Add per-entity metadata loading with individual progress indicators. Track this in `docs/tasks/open-tasks.md`.
- Keep the Sentio endpoint health check visible in `/admin`.
