import { indexer } from 'envio';

const noop = async () => {};

indexer.onEvent({ contract: 'ActionRepo', event: 'ActionAdded' }, noop);
indexer.onEvent({ contract: 'ActionRepo', event: 'ActionURI' }, noop);
