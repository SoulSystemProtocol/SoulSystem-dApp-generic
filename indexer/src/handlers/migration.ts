export function handlerNotPorted(handlerName: string): never {
  throw new Error(
    `${handlerName} still needs to be ported from src/subgraph-reference before running the Envio indexer.`,
  );
}
