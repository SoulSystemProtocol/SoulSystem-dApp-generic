import { indexer, type Claim, type Game } from 'envio';

const gameContractType = 'game';
const claimContractTypes = new Set(['process', 'task', 'claim']);

const blockTimestamp = (timestamp: number): bigint => BigInt(timestamp);

const defaultGame = (id: string, hub: string, createdDate: bigint): Game => ({
  id,
  hub,
  name: id,
  type: gameContractType,
  role: '',
  createdDate,
});

const defaultClaim = (
  id: string,
  hub: string,
  type: string,
  createdDate: bigint,
): Claim => ({
  id,
  hub,
  name: id,
  game_id: undefined,
  type,
  role: '',
  stage: 0,
  createdDate,
  updatedDate: createdDate,
});

indexer.contractRegister(
  { contract: 'Hub', event: 'ContractCreated' },
  async ({ event, context }) => {
    const contractType = event.params._0;
    const contractAddress = event.params._1;

    if (contractType === gameContractType) {
      context.chain.Game.add(contractAddress);
      return;
    }

    if (claimContractTypes.has(contractType)) {
      context.chain.Claim.add(contractAddress);
    }
  },
);

indexer.onEvent(
  { contract: 'Hub', event: 'ContractCreated' },
  async ({ event, context }) => {
    const contractType = event.params._0;
    const contractAddress = event.params._1.toLowerCase();
    const createdDate = blockTimestamp(event.block.timestamp);
    const hub = event.srcAddress.toLowerCase();

    if (contractType === gameContractType) {
      const existing = await context.Game.get(contractAddress);
      context.Game.set({
        ...defaultGame(contractAddress, hub, createdDate),
        ...existing,
        hub,
        createdDate: existing?.createdDate ?? createdDate,
      });
      return;
    }

    if (claimContractTypes.has(contractType)) {
      const existing = await context.Claim.get(contractAddress);
      context.Claim.set({
        ...defaultClaim(contractAddress, hub, contractType, createdDate),
        ...existing,
        hub,
        type: existing?.type ?? contractType,
        stage: existing?.stage ?? 0,
        createdDate: existing?.createdDate ?? createdDate,
        updatedDate: createdDate,
      });
    }
  },
);
