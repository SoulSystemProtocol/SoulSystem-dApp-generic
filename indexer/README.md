# SoulSystem Indexer

This folder is the Envio HyperIndex migration scaffold for the SoulSystem Aurora indexer.

## Source Material

- Legacy/Sentio-compatible graph source: `C:\GitHubs\SubgraphStudio\graph`
- ABIs copied from: `C:\GitHubs\SubgraphStudio\graph\abis`
- Handler references copied into: `src/subgraph-reference`
- Runtime data consumed by the dApp through: `NEXT_PUBLIC_INDEXER_GRAPHQL_URL`

## Status

The project has the Envio file structure, contract/event configuration, Aurora addresses, schema, ABI assets, and source handler references.

Envio 3.2.1 currently ships native CLI packages for Linux and macOS, but not Windows. On Windows, the CLI exits before codegen with:

```text
Cannot read properties of null (reading 'runCli')
```

Run codegen and local indexer validation on Linux/macOS, in a Linux container, or through the GitHub Actions `Indexer codegen and typecheck` job.

`src/handlers` contains fail-fast migration stubs until each legacy handler is ported from `src/subgraph-reference` against generated Envio bindings. After editing handlers, run:

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
