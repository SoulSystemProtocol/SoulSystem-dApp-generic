# Platform Admin Dashboard

## Overview

An admin dashboard is available at `/admin` to provide quick visibility into backend connectivity used by the dApp.

## Responsibilities

- Display health status for the existing subgraph connection.
- Display health status for an additional MongoDB connection configured via `MONGODB_URI`.

## Data Sources

- **Subgraph (existing connection)**
  - Endpoint: `NEXT_PUBLIC_SUBGRAPH_API`.
  - Checked via a lightweight GraphQL request.

- **MongoDB (additional connection)**
  - URI: `process.env.MONGODB_URI` (server-side only, canonical Mongo configuration for the dApp).
  - Checked via a simple `ping` command using the official `mongodb` driver.

## Technical Details

- Health check helpers live in `helpers/db.ts` and expose:
  - `checkSubgraphHealth(): Promise<{ ok: boolean; message: string }>`
  - `checkMongoHealth(uri?: string): Promise<{ ok: boolean; message: string }>`
- `/admin` is implemented as `pages/admin/index.tsx` using `getServerSideProps` to avoid exposing any secrets and to ensure checks run only on the server.

## Usage

- Navigate to `/admin` while the app is running.
- Review the status chips and messages for:
  - Subgraph (existing connection).
  - MongoDB (MONGODB_URI).

If either check fails, the corresponding card will show `Error` and provide a short diagnostic message to assist debugging.
