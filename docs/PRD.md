# Platform Admin Dashboard

## Overview

An admin dashboard is available at `/admin` to provide quick visibility into backend connectivity used by the dApp.

## Responsibilities

- Display health status for the configured indexer connection.
- Display health status for an additional MongoDB connection configured via `MONGODB_URI`.

## Data Sources

- **Indexer**
  - Endpoint: `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`.
  - Temporary fallback endpoint: `NEXT_PUBLIC_SUBGRAPH_API`.
  - Current hosted provider: Sentio compatibility-mode subgraph.
  - Status URL: `NEXT_PUBLIC_INDEXER_STATUS_URL`.
  - Checked via a lightweight GraphQL request.

- **MongoDB (additional connection)**
  - URI: `process.env.MONGODB_URI` (server-side only, canonical Mongo configuration for the dApp).
  - Checked via a simple `ping` command using the official `mongodb` driver.

## Technical Details

- Health check helpers live in `helpers/db.ts` and expose:
  - `checkIndexerHealth(): Promise<{ ok: boolean; message: string }>`
  - `checkSubgraphHealth(): Promise<{ ok: boolean; message: string }>` (temporary compatibility alias)
  - `checkMongoHealth(uri?: string): Promise<{ ok: boolean; message: string }>`
- `/admin` is implemented as `pages/admin/index.tsx` using `getServerSideProps` to avoid exposing any secrets and to ensure checks run only on the server.
- The public web manifest is served from `public/manifest.json`; any app metadata shown in `<head>` should import that file instead of keeping a second root manifest copy.
- HubSpot tracking is opt-in through `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`. Leave it empty to avoid loading HubSpot scripts and ad-blocker console noise; set it to the portal ID only when HubSpot collection is required.

## Usage

- Navigate to `/admin` while the app is running.
- Review the status chips and messages for:
  - Indexer.
  - MongoDB (MONGODB_URI).

If either check fails, the corresponding card will show `Error` and provide a short diagnostic message to assist debugging.

For Sentio deployments, copy the hosted subgraph GraphQL endpoint from Sentio Data Studio into `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`. Keep `NEXT_PUBLIC_SUBGRAPH_API` empty unless a legacy fallback is explicitly needed.

Current Sentio GraphQL endpoint:

```text
https://app.sentio.xyz//api/v1/graphql/toledoroy/soulsystem-aurora
```
