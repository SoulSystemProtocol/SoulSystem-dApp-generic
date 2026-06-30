# Open Tasks

Status: Active
Date: 2026-06-30

This file is the lightweight task index for repo-local follow-up work. The dApp uses Sentio's hosted GraphQL endpoint through `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`.

## In Progress

- [ ] Keep the Sentio indexer path healthy.
  - Source: `docs/superpowers/plans/2026-06-16-replace-the-graph-indexer.md`
  - Next action: monitor `/admin` indexer health and keep `NEXT_PUBLIC_INDEXER_GRAPHQL_URL` pointed at the Sentio Data Studio GraphQL endpoint.

## Product Experience

- [ ] Add per-entity metadata loading with individual progress indicators.
  - Source paths: `services/indexer/metadataHydration.ts`, `hooks/useSoulMetadata.ts`, `components/PaginatedList.tsx`, `components/entity/soul/SoulSearchBox.tsx`
  - Instructions: load metadata independently for each entity/list entry instead of blocking the whole collection, expose per-item hydration state from the metadata hook, and render an individual progress indicator on each entry whose metadata is still loading.
- [ ] Add global search to the navigation shell.
  - Source TODOs: `components/layout/NavBar.tsx`
  - Instructions: implement an icon button with a tooltip that opens a simple search affordance, reuse existing soul search routes where possible, and keep mobile behavior clear.
- [ ] Add type and role filtering to soul search results.
  - Source TODOs: `pages/souls/[search].tsx`
  - Instructions: make filters explicit in URL/query state so search results are shareable and reload-safe.
- [ ] Add stable ordering support to paginated lists.
  - Source TODOs: `components/PaginatedList.tsx`
  - Instructions: define a single ordering contract and pass it through list callers instead of adding one-off sorting in screens.
- [ ] Finish OpenSea/Safe NFT/Lens profile surfaces or remove dead WIP UI.
  - Source TODOs: `components/layout/OpenseaLink.tsx`, `components/erc/Deploy.tsx`, `components/entity/soul/SoulLensProfile.tsx`
  - Instructions: verify whether these features are still part of the product direction before expanding UI.

## Roles And Permissions

- [ ] Consolidate role selection and role naming behavior.
  - Source TODOs: `components/entity/post/PostAddDialog.tsx`, `components/form/widget/ActionSelect.tsx`, `hooks/useDao.ts`
  - Instructions: create one source of truth for available roles per entity and reuse it in post creation, action selection, and DAO/game hooks.
- [ ] Enable the role filter UI for context parts.
  - Source TODOs: `components/entity/game/CTXParts.tsx`
  - Instructions: wire filtering to existing participant role data and preserve the current default unfiltered view.
- [ ] Support role-change actions in game role management.
  - Source TODOs: `components/entity/game/GameRoleManageDialog.tsx`
  - Instructions: add a `roleChange` action only after confirming the contract/action schema supports from/to role fields.

## Tasks And Claims

- [ ] Optimize task application nomination loading.
  - Source TODOs: `components/entity/task/TaskApplication.tsx`
  - Instructions: fetch only the nomination data required by the application row instead of relying on broad task detail payloads.
- [ ] Support editing task details for non-current souls.
  - Source TODOs: `components/entity/task/TaskDetail.tsx`, `components/entity/project/ProjectManageDialog.tsx`
  - Instructions: reuse the existing soul edit form flow where possible and keep authorization checks explicit.
- [ ] Capture cancellation reasons in task metadata.
  - Source TODOs: `components/entity/task/TaskDetail.tsx`
  - Instructions: extend URI metadata in a backward-compatible way so existing tasks without reasons still render cleanly.
- [ ] Add whitelisted ERC20 token support for task funding.
  - Source TODOs: `components/entity/task/TaskCardDetails.tsx`, `components/web3/chains/ChainsData.tsx`
  - Instructions: make the token list chain-aware and centralize it in chain configuration.

## Web3 And Error Handling

- [ ] Improve token balance fetching.
  - Source TODOs: `components/web3/TokenBalance.tsx`
  - Instructions: evaluate the commented `fetchBalance` path and prefer the wagmi-supported API if it reduces custom balance logic.
- [ ] Improve wallet error extraction.
  - Source TODOs: `hooks/useError.ts`
  - Instructions: normalize MetaMask/provider errors into user-safe messages while preserving debug detail in logs.
- [ ] Add optimistic refresh behavior for editing non-current souls.
  - Source TODOs: `components/form/SoulEditForm.tsx`
  - Instructions: choose either optimistic cache updates or a targeted query refresh; avoid full-page reloads unless no reliable cache path exists.

## Maintenance

- [ ] Remove debug-only TODO logs and comments as nearby code is touched.
  - Source TODOs: `components/form/widget/MySoulsBox.tsx`, `components/PaginatedList.tsx`
  - Instructions: clean these opportunistically during related feature work rather than as a standalone churn commit.
- [ ] Modernize client runtime dependencies.
  - Source: dependency audit
  - Instructions: align `@apollo/client`, `wagmi`, `@web3modal/ethereum`, and `@web3modal/react` together and validate with CI.
