import { indexer } from 'envio';

const noop = async () => {};

indexer.onEvent({ contract: 'Game', event: 'TransferByToken' }, noop);
indexer.onEvent({ contract: 'Game', event: 'Nominate' }, noop);
indexer.onEvent({ contract: 'Game', event: 'Post' }, noop);
indexer.onEvent({ contract: 'Game', event: 'RoleCreated' }, noop);
indexer.onEvent({ contract: 'Game', event: 'URI' }, noop);
