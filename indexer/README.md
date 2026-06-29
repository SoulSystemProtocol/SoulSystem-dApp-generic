# SoulSystem Indexer

This folder is the Envio HyperIndex migration scaffold for the SoulSystem Aurora indexer.

## Source Material

- Legacy/Sentio-compatible graph source: `C:\GitHubs\SubgraphStudio\graph`
- ABIs copied from: `C:\GitHubs\SubgraphStudio\graph\abis`
- Handler references copied into: `src/subgraph-reference`
- Runtime data consumed by the dApp through: `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`

## Status

The project has the Envio file structure, contract/event configuration, Aurora addresses, schema, ABI assets, and source handler references. The Envio CLI currently fails in this environment before it can scaffold or codegen:

```text
Cannot read properties of null (reading 'runCli')
```

Because of that, `src/handlers` contains fail-fast migration stubs instead of claiming a complete runtime port. Port each handler from `src/subgraph-reference`, then run:

```powershell
pnpm install
pnpm codegen
pnpm dev
```

## Migration Notes

- Register `Game` and `Claim` addresses dynamically from `Hub.ContractCreated`.
- Preserve the dApp-facing GraphQL field names in `schema.graphql`.
- Keep IPFS metadata hydration outside the indexer unless Envio-hosted effects are explicitly adopted for external fetch reliability.
- Validate against `scripts/compare-indexer-query-parity.mjs` before changing the dApp endpoint.
