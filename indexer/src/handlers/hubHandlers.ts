import { indexer } from 'envio';

const gameContractType = 'GAME';
const claimContractTypes = new Set(['PROCESS', 'TASK', 'CLAIM']);

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

indexer.onEvent({ contract: 'Hub', event: 'ContractCreated' }, async () => {});
