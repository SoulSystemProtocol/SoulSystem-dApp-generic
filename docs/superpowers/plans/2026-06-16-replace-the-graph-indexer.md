# Replace The Graph Indexer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dApp's dependency on The Graph hosted-service/Studio flow with a durable indexing path that keeps SoulSystem data queryable on Aurora.

**Architecture:** Introduce a provider-neutral indexer client inside the dApp first, then migrate the indexer backend. The current production bridge is Sentio Hosted Subgraphs compatibility mode because it supports Aurora while preserving the existing subgraph code. The recommended long-term backend remains Envio HyperIndex if the project wants to move away from Graph manifest/AssemblyScript infrastructure.

**Tech Stack:** Next.js 13, React 18, ethers v5, axios/Apollo Client, Aurora EVM contracts, Envio HyperIndex TypeScript indexer, GraphQL compatibility boundary.

---

## Current State

- dApp Graph endpoint is configured through `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`.
- The current production hosted indexer path is Sentio compatibility mode at `https://app.sentio.xyz/toledoroy/soulsystem-aurora/datasource/sDQzRF2F`.
- The active dApp GraphQL endpoint is `https://app.sentio.xyz//api/v1/graphql/toledoroy/soulsystem-aurora`.
- `NEXT_PUBLIC_SUBGRAPH_API` is retained only as an empty legacy fallback and should not point to The Graph.
- dApp query code is spread across `hooks/useSubgraph.ts`, `utils/subgraph.ts`, `utils/subgraphQueries.ts`, `utils/index.ts`, `helpers/db.ts`, `pages/_app.tsx`, and several entity/rule consumers.
- The subgraph package at `C:\Users\toled\Documents\GitHub\Subgraph` indexes Aurora contracts from `startBlock: 94773622`.
- The subgraph uses dynamic templates for `Game` and `Claim` contracts created by `Hub`.
- The schema includes `Soul`, `Account`, `Game`, `Claim`, `Action`, `GameRule`, role, participant, nomination, post, and payment entities.
- The mapping code fetches IPFS metadata in handlers. The replacement must either preserve this behavior or move metadata hydration into a controlled app/server worker.

## Decision

Use a two-phase migration.

1. **Phase 1: dApp adapter boundary.** Replace direct `useSubgraph`/`runSubgraphQuery` usage with a single `indexer` module that exposes current domain methods.
2. **Phase 2: Envio indexer.** Port the subgraph manifest, schema, and handlers into a TypeScript Envio HyperIndex project, then point the adapter to the new GraphQL endpoint.

Sentio/Goldsky/SubQuery remain practical fallback paths:

- **Sentio:** Current bridge. It can deploy the existing subgraph in compatibility mode with Aurora chain ID `1313161554`, but the final GraphQL endpoint is exposed through Sentio Data Studio rather than the current CLI output.
- **Goldsky:** Best emergency bridge. It can run existing subgraph-style projects with minimal changes and preserve the current GraphQL query surface, but it keeps the project in the subgraph model.
- **SubQuery:** Similar bridge with a migration path from The Graph and broad EVM support, but still requires provider adoption and likely some mapping adjustments.
- **The Graph Network:** Not preferred because the explicit goal is to stop using The Graph rather than move from hosted service to the decentralized network.

## Research References

- The Graph hosted-service sunset/migration: `https://thegraph.com/blog/sunsetting-hosted-service/`
- The Graph Studio deployment docs: `https://thegraph.com/docs/en/subgraphs/developing/deploying/using-subgraph-studio/`
- Envio Aurora support: `https://docs.envio.dev/docs/HyperIndex/aurora`
- Envio supported networks: `https://docs.envio.dev/docs/HyperIndex/supported-networks`
- Goldsky subgraph compatibility: `https://docs.goldsky.com/subgraphs/introduction`
- Goldsky migration from The Graph: `https://docs.goldsky.com/subgraphs/migrate-from-the-graph`
- SubQuery Graph migration: `https://subquery.network/doc/indexer/build/graph-migration.html`

## File Structure

- Create `services/indexer/types.ts`: Shared dApp-facing entity and query parameter types.
- Create `services/indexer/client.ts`: Provider-neutral `SoulSystemIndexer` interface and configured singleton.
- Create `services/indexer/graphqlClient.ts`: Generic GraphQL POST helper with consistent error handling.
- Create `services/indexer/soulSystemGraphqlIndexer.ts`: Current GraphQL implementation backed by `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`.
- Modify `hooks/useSubgraph.ts`: Keep the current hook API as a compatibility wrapper over `services/indexer`.
- Modify `utils/subgraph.ts`: Replace with re-exports or deprecate after callers move.
- Modify `helpers/db.ts`: Rename health check semantics from `Subgraph` to `Indexer`, while keeping a temporary alias for admin props.
- Modify `pages/_app.tsx`: Use the new indexer endpoint env var where Apollo is still required.
- Modify `.env` and docs: Introduce `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`; keep `NEXT_PUBLIC_SUBGRAPH_API` only as temporary backward compatibility.
- Create sibling indexer package, recommended path `C:\Users\toled\Documents\GitHub\SoulSystem-Indexer`, or move it later into this repo under `indexer/` if a monorepo is desired.

### Task 1: Add The dApp Indexer Boundary

**Files:**

- Create: `services/indexer/types.ts`
- Create: `services/indexer/graphqlClient.ts`
- Create: `services/indexer/client.ts`
- Create: `services/indexer/soulSystemGraphqlIndexer.ts`
- Modify: `hooks/useSubgraph.ts`
- Modify: `utils/subgraph.ts`
- Modify: `utils/subgraphQueries.ts`
- Modify: `utils/index.ts`

- [x] **Step 1: Create shared types**

Create `services/indexer/types.ts`:

```ts
export type IndexerVariables = Record<string, unknown>;

export type SoulEntity = {
  id: string;
  owner: string;
  type?: string;
  role?: string;
  uri?: string;
  metadata?: string;
  uriImage?: string;
  image?: string;
  name?: string;
  tags?: string[];
  attrs?: Array<{ id: string; role: string; bEnd: string }>;
  participantGame?: Array<{ id: string; roles: string[] }>;
  participantProc?: Array<{ id: string; roles: string[] }>;
};

export type GameEntity = Record<string, unknown>;
export type ClaimEntity = Record<string, unknown>;
export type ActionEntity = Record<string, unknown>;
export type GameRuleEntity = Record<string, unknown>;

export type SoulSearchParams = {
  ids?: string[];
  owners?: string[];
  type?: string;
  first?: number;
  skip?: number;
};

export type GameSearchParams = {
  ids?: string[];
  type?: string;
  first?: number;
  skip?: number;
};

export type ClaimSearchParams = {
  ids?: string[];
  type?: string;
  game?: string;
  first?: number;
  skip?: number;
};

export type GameRuleSearchParams = {
  ids: string[];
  containerId?: string;
  actionGuid?: string;
  isPositive?: boolean;
  isNegative?: boolean;
  isEnabled?: boolean;
};
```

- [x] **Step 2: Create the GraphQL helper**

Create `services/indexer/graphqlClient.ts`:

```ts
import axios from 'axios';
import type { IndexerVariables } from './types';

export async function runIndexerGraphqlQuery<TData>(
  query: string,
  variables: IndexerVariables = {},
): Promise<TData> {
  const endpoint =
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_SUBGRAPH_API;

  if (!endpoint) {
    throw new Error(
      'Indexer GraphQL endpoint is not configured. Set NEXT_PUBLIC_INDEXER_GRAPHQL_URL.',
    );
  }

  try {
    const response = await axios.post(endpoint, { query, variables });

    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }

    return response.data.data as TData;
  } catch (error: any) {
    throw new Error(
      `Could not query the indexer: ${error?.message ?? 'Unknown error'}`,
    );
  }
}
```

- [x] **Step 3: Create the provider interface**

Create `services/indexer/client.ts`:

```ts
import { soulSystemGraphqlIndexer } from './soulSystemGraphqlIndexer';
import type {
  ActionEntity,
  ClaimEntity,
  ClaimSearchParams,
  GameEntity,
  GameRuleEntity,
  GameRuleSearchParams,
  GameSearchParams,
  SoulEntity,
  SoulSearchParams,
} from './types';

export type SoulSystemIndexer = {
  findSouls(params: SoulSearchParams): Promise<SoulEntity[]>;
  findGames(params: GameSearchParams): Promise<GameEntity[]>;
  findClaims(params: ClaimSearchParams): Promise<ClaimEntity[]>;
  isGamePart(gameId: string, sbt: string): Promise<boolean>;
  getGameRules(params: GameRuleSearchParams): Promise<GameRuleEntity[]>;
  findActionEntities(guids?: string[]): Promise<ActionEntity[]>;
  getSoulById(id: string): Promise<SoulEntity | null>;
  getSoulByOwner(owner: string): Promise<SoulEntity | null>;
  getSBTForAccount(address: string): Promise<string | undefined>;
};

export const indexer: SoulSystemIndexer = soulSystemGraphqlIndexer;
```

- [x] **Step 4: Move current GraphQL implementation behind the interface**

Create `services/indexer/soulSystemGraphqlIndexer.ts` by moving the current query builders from `hooks/useSubgraph.ts` and `utils/subgraph.ts` into this file. Keep method names and response shapes equivalent:

```ts
import { hexStringToJson } from 'utils/converters';
import { IS_GAMES_CREATED_BY_NOT_HUB_DISABLED } from 'constants/features';
import { runIndexerGraphqlQuery } from './graphqlClient';
import type {
  ActionEntity,
  ClaimEntity,
  ClaimSearchParams,
  GameEntity,
  GameRuleEntity,
  GameRuleSearchParams,
  GameSearchParams,
  SoulEntity,
  SoulSearchParams,
  SoulSystemIndexer,
} from './client';
```

Then implement the existing `findSouls`, `findGames`, `findClaims`, `isGamePart`, `getGameRules`, `findActionEntities`, `getSoulById`, `getSoulByOwner`, and `getSBTForAccount` methods using the exact query fields currently used by the dApp.

- [x] **Step 5: Keep existing hook API stable**

Replace `hooks/useSubgraph.ts` body with a wrapper:

```ts
import { indexer } from 'services/indexer/client';

export default function useSubgraph() {
  return {
    getSoulById: indexer.getSoulById,
    isGamePart: indexer.isGamePart,
    findSouls: (
      ids?: string[],
      owners?: string[],
      type?: string,
      first?: number,
      skip?: number,
    ) => indexer.findSouls({ ids, owners, type, first, skip }),
    findGames: (ids?: string[], type?: string, first?: number, skip?: number) =>
      indexer.findGames({ ids, type, first, skip }),
    findClaims: (
      ids?: string[],
      type?: string,
      game?: string,
      first?: number,
      skip?: number,
    ) => indexer.findClaims({ ids, type, game, first, skip }),
    findActionEntities: indexer.findActionEntities,
    getGameRules: (
      ids: string[],
      containerId: string,
      actionGuid?: string,
      isPositive?: boolean,
      isNegative?: boolean,
      isEnabled?: boolean,
    ) =>
      indexer.getGameRules({
        ids,
        containerId,
        actionGuid,
        isPositive,
        isNegative,
        isEnabled,
      }),
  };
}
```

- [x] **Step 6: Run validation**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands pass or reveal pre-existing lint/build issues that are documented before continuing.

Status on 2026-06-16:

- `npm run lint` passes with warnings in pre-existing files outside the indexer adapter.
- Targeted TypeScript diagnostics show no errors in `services/indexer`, `hooks/useSubgraph.ts`, `utils/subgraph.ts`, `utils/subgraphQueries.ts`, or `utils/index.ts`.
- `npm run build` is blocked by the existing `components/entity/CTXRoleAddDialog.tsx` import: `@rjsf/material-ui` has no exported member `MuiForm5`.

### Task 2: Rename Runtime Configuration To Indexer

**Files:**

- Modify: `.env`
- Modify: `pages/_app.tsx`
- Modify: `helpers/db.ts`
- Modify: `pages/admin/index.tsx`
- Modify: `docs/PRD.md`

- [x] **Step 1: Add the new environment variable**

In `.env`, add:

```dotenv
NEXT_PUBLIC_INDEXER_GRAPHQL_URL=https://api.thegraph.com/subgraphs/name/toledoroy/soulsystem_aurora
```

Keep `NEXT_PUBLIC_SUBGRAPH_API` during the first release only for fallback compatibility.

- [x] **Step 2: Update Apollo endpoint**

In `pages/_app.tsx`, use:

```ts
uri:
  process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_SUBGRAPH_API,
```

- [x] **Step 3: Update health check naming**

In `helpers/db.ts`, add:

```ts
export async function checkIndexerHealth(): Promise<HealthStatus> {
  const uri =
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_SUBGRAPH_API;

  if (!uri) {
    return {
      ok: false,
      message: 'NEXT_PUBLIC_INDEXER_GRAPHQL_URL is not configured',
    };
  }

  try {
    const response = await axios.post(uri, {
      query: '{ __typename }',
    });

    if (response.data.errors) {
      return {
        ok: false,
        message: `Indexer responded with errors: ${JSON.stringify(
          response.data.errors,
        )}`,
      };
    }

    return {
      ok: true,
      message: 'Indexer is reachable and responded successfully',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `Indexer request failed: ${error?.message ?? 'Unknown error'}`,
    };
  }
}

export const checkSubgraphHealth = checkIndexerHealth;
```

- [x] **Step 4: Update admin copy**

In `pages/admin/index.tsx`, change user-facing labels from `Subgraph` to `Indexer`, while keeping prop names stable if that makes the diff smaller.

- [x] **Step 5: Run validation**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands pass or any failures are captured with file paths and root cause.

Status on 2026-06-16:

- `npm run lint` passes with warnings in pre-existing files outside the indexer/admin changes.
- Targeted TypeScript diagnostics show no errors in the touched indexer, admin, app, helper, or utility files.
- `npm run build` remains blocked by the existing `components/entity/CTXRoleAddDialog.tsx` `MuiForm5` import issue.

### Task 3: Create The Envio Indexer Project

**Files:**

- Create: `C:\Users\toled\Documents\GitHub\SoulSystem-Indexer`
- Use source: `C:\Users\toled\Documents\GitHub\Subgraph\schema.graphql`
- Use source: `C:\Users\toled\Documents\GitHub\Subgraph\subgraph.yaml`
- Use source: `C:\Users\toled\Documents\GitHub\Subgraph\abis\*.json`

- [ ] **Step 1: Scaffold Envio**

Run in `C:\Users\toled\Documents\GitHub`:

```powershell
pnpm dlx envio init SoulSystem-Indexer
```

Expected: a new `SoulSystem-Indexer` project with Envio config, generated schema/codegen setup, and package scripts.

- [ ] **Step 2: Configure Aurora contracts**

Create the Envio config with these static contracts:

```yaml
name: soulsystem-indexer
networks:
  - id: aurora
    start_block: 94773622
    contracts:
      - name: Soul
        address:
          - '0xD1b792De2c9c358F0C765C9f07DD618A12d8E97C'
      - name: Hub
        address:
          - '0x3CfF0AC9554Bc90ac37b8b84c2449F5B27f35740'
      - name: ActionRepo
        address:
          - '0x75228869bD1Bbae3b534681826730134e2385a13'
      - name: OpenRepo
        address:
          - '0x2C9cc43C53141AA1CD16699f4Fe24742269c2Fe5'
```

Then add dynamic contract registration for `Game` and `Claim` addresses emitted by `Hub.ContractCreated`.

- [ ] **Step 3: Port entity schema**

Translate each entity in `schema.graphql` into Envio schema definitions, preserving field names used by the dApp:

```graphql
type Soul {
  id: ID!
  owner: String!
  type: String!
  role: String!
  stage: Int!
  uri: String
  metadata: String
  handle: String
  uriImage: String!
  uriFirstName: String!
  uriLastName: String!
  image: String!
  name: String!
  tags: [String!]
  searchField: String
}
```

Repeat for `Account`, `Game`, `Claim`, `Action`, `GameRule`, `GameRole`, `ProcRole`, `GameParticipant`, `ProcParticipant`, `GameNomination`, `ProcNomination`, `GamePost`, `ProcPost`, `SoulPost`, `SoulOpinion`, `SoulPart`, `EvtPayment`, and `PaymentTotal`.

- [ ] **Step 4: Port handlers incrementally**

Port handlers in this order:

1. `soulHandlers.ts`: `Transfer`, `URI`, `SoulType`, `SoulHandle`, `Announcement`, `OpinionChange`.
2. `hubHandlers.ts`: `ContractCreated` and dynamic registration.
3. `gameHandlers.ts`: `RoleCreated`, `URI`, `TransferByToken`, `Nominate`, `Post`.
4. `claimHandlers.ts`: `Stage`, `RoleCreated`, `URI`, `PaymentReleased`, `ERC20PaymentReleased`, `TransferByToken`, `Nominate`, `Post`.
5. `actionRepoHandler.ts`: `ActionAdded`, `ActionURI`.
6. `openRepoHandlers.ts`: `StringSet`, `AddressAdd`, `AddressSet`.

- [x] **Step 5: Decide metadata hydration behavior**

Keep handler-side IPFS fetch only if Envio hosting supports the same reliability as the old mapping behavior. Otherwise, write raw `uri` during indexing and hydrate metadata in the dApp/server layer with a cache.

2026-06-18 evidence: Soul `9` returned `metadata: null` from the indexer with `uri: ipfs://QmUrmh5KpEHR3w16iFZK6TGBWqKvpRkDLUzVPr1UiipZZ9`, but the CID is still available through public gateways (`dweb.link`, `ipfs.io`, and Pinata) and returns the expected `Alter Ego` JSON. Add metadata hydration for entities with a raw `uri` and null/empty `metadata`, preferably behind the indexer adapter or a server-side cache so UI hooks do not duplicate IPFS fetch logic.

Implemented in this dApp indexer adapter on 2026-06-18: `services/indexer/metadataHydration.ts` hydrates `Soul` entities with null/empty `metadata` from their raw `uri`; `soulSystemGraphqlIndexer` applies it in `getSoulById`, `getSoulByOwner`, and `findSouls`.

For dApp/server hydration, create:

```ts
export async function fetchIpfsJson(uri: string): Promise<unknown | null> {
  const hash = uri.split('/').filter(Boolean).at(-1);
  if (!hash) return null;

  const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
  if (!response.ok) return null;

  return response.json();
}
```

- [ ] **Step 6: Run local indexer validation**

Run in the indexer project:

```powershell
pnpm install
pnpm dev
```

Expected: the indexer starts, connects to Aurora, and exposes a local GraphQL endpoint.

### Task 4: Verify Query Parity

**Files:**

- Create: `scripts/compare-indexer-query-parity.mjs`
- Use endpoints: old `NEXT_PUBLIC_SUBGRAPH_API`, new Envio local/hosted endpoint

- [ ] **Step 1: Create parity script**

Create `scripts/compare-indexer-query-parity.mjs`:

```js
import assert from 'node:assert/strict';

const oldEndpoint = process.env.OLD_INDEXER_GRAPHQL_URL;
const newEndpoint = process.env.NEW_INDEXER_GRAPHQL_URL;

if (!oldEndpoint || !newEndpoint) {
  throw new Error('Set OLD_INDEXER_GRAPHQL_URL and NEW_INDEXER_GRAPHQL_URL');
}

async function gql(endpoint, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();
  if (body.errors) throw new Error(JSON.stringify(body.errors));
  return body.data;
}

const queries = [
  {
    name: 'souls',
    query: `{
      souls(first: 5, skip: 0) {
        id
        owner
        type
        uri
        metadata
        uriImage
        name
      }
    }`,
  },
  {
    name: 'games',
    query: `{
      games(first: 5, skip: 0) {
        id
        name
        type
        role
      }
    }`,
  },
  {
    name: 'claims',
    query: `{
      claims(first: 5, skip: 0) {
        id
        name
        stage
        type
      }
    }`,
  },
  {
    name: 'actions',
    query: `{
      actions(first: 5) {
        id
        subject
        verb
        object
        tool
        uri
        metadata
      }
    }`,
  },
];

for (const item of queries) {
  const oldData = await gql(oldEndpoint, item.query);
  const newData = await gql(newEndpoint, item.query);
  assert.deepEqual(newData, oldData, `${item.name} query mismatch`);
  console.log(`${item.name}: OK`);
}
```

- [ ] **Step 2: Run parity**

Run:

```powershell
$env:OLD_INDEXER_GRAPHQL_URL="https://api.thegraph.com/subgraphs/name/toledoroy/soulsystem_aurora"
$env:NEW_INDEXER_GRAPHQL_URL="http://localhost:8080/v1/graphql"
node scripts/compare-indexer-query-parity.mjs
```

Expected: each query prints `OK`. Any mismatch gets fixed in the Envio handlers or dApp adapter before cutover.

### Task 5: Cut Over The dApp

**Files:**

- Modify: `.env`
- Modify: deployment environment variables
- Modify: `docs/PRD.md`
- Modify: `docs/memory.md` if project memory exists or is useful

- [ ] **Step 1: Change endpoint**

Set:

```dotenv
NEXT_PUBLIC_INDEXER_GRAPHQL_URL=<envio-hosted-or-self-hosted-graphql-endpoint>
```

- [ ] **Step 2: Remove direct Graph hosted references**

Search:

```powershell
rg -n "api.thegraph.com|thegraph.com|NEXT_PUBLIC_SUBGRAPH_API|useSubgraph|subgraph" .
```

Expected: only compatibility comments or external Lens integration remain. The SoulSystem data path should use `indexer`.

- [ ] **Step 3: Validate app**

Run:

```powershell
npm run lint
npm run build
npm run dev
```

Then manually verify:

- `/admin` shows Indexer OK.
- Soul profile route loads by token id.
- Soul profile route loads by owner hash/address.
- DAO/project list loads.
- Task/claim details load nominations, roles, posts, and winners.
- Rule tables load action/rule data.

- [ ] **Step 4: Remove old env fallback**

After one stable deployment, remove `NEXT_PUBLIC_SUBGRAPH_API` from runtime code and deployment configuration.

## Open Questions

- Where should the new indexer live long-term: a sibling repo (`SoulSystem-Indexer`) or inside this repo as `indexer/`?
- Is hosted Envio acceptable, or should the project self-host the indexer and database?
- Should IPFS metadata be indexed as stored fields, or should the app hydrate/cache metadata outside the indexer?
- Is exact GraphQL shape compatibility required for every existing query, or can we simplify entities as long as current screens work?

## Recommended Next Step

Start with Task 1 in this repo. It gives the dApp a single source of truth for indexed data access and makes the later provider migration much less risky.

## Follow-up Task: Modernize Client Runtime Dependencies

- [ ] Review the Apollo/Web3 dependency set together instead of pinning one package in isolation. Current build validation passes, but `@apollo/client@3.14.0` emits `canonizeResults` deprecation messages during static generation, and the Web3 stack emits storage-option deprecation messages.
- [ ] Upgrade or align `@apollo/client`, `wagmi`, `@web3modal/ethereum`, and `@web3modal/react` as one compatibility slice.
- [ ] After dependency alignment, run `npm install --legacy-peer-deps`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
