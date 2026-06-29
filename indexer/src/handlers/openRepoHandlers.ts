import { indexer } from 'envio';

const noop = async () => {};

indexer.onEvent({ contract: 'OpenRepo', event: 'StringSet' }, noop);
indexer.onEvent({ contract: 'OpenRepo', event: 'AddressAdd' }, noop);
indexer.onEvent({ contract: 'OpenRepo', event: 'AddressSet' }, noop);
