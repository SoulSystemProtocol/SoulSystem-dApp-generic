import { indexer } from 'envio';

const noop = async () => {};

indexer.onEvent({ contract: 'Claim', event: 'Stage' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'TransferByToken' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'Nominate' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'Post' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'RoleCreated' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'URI' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'PaymentReleased' }, noop);
indexer.onEvent({ contract: 'Claim', event: 'ERC20PaymentReleased' }, noop);
