import { indexer } from 'envio';

const noop = async () => {};

indexer.onEvent({ contract: 'Soul', event: 'Transfer' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'Approval' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'ApprovalForAll' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'URI' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'SoulType' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'Announcement' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'SoulHandle' }, noop);
indexer.onEvent({ contract: 'Soul', event: 'OpinionChange' }, noop);
