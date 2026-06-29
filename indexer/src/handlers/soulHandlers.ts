import { indexer, type Soul, type SoulOpinion } from 'envio';

const zeroAddress = '0x0000000000000000000000000000000000000000';

const normalizeAddress = (address: string): string => address.toLowerCase();
const tokenId = (value: bigint): string => value.toString();
const eventEntityId = (blockHash: string, logIndex: number): string =>
  `${blockHash}_${logIndex}`;

const defaultSoul = (id: string, owner: string): Soul => ({
  id,
  owner,
  type: '',
  role: '',
  stage: 0,
  uri: undefined,
  metadata: undefined,
  handle: undefined,
  uriImage: '',
  uriFirstName: '',
  uriLastName: '',
  image: '',
  name: '',
  tags: undefined,
  searchField: undefined,
});

indexer.onEvent(
  { contract: 'Soul', event: 'Transfer' },
  async ({ event, context }) => {
    const id = tokenId(event.params._2);
    const from = normalizeAddress(event.params._0);
    const to = normalizeAddress(event.params._1);

    if (to === zeroAddress) {
      context.Soul.deleteUnsafe(id);
      if (from !== zeroAddress) {
        context.Account.deleteUnsafe(from);
      }
      return;
    }

    const existing = await context.Soul.get(id);

    if (from !== zeroAddress) {
      context.Account.deleteUnsafe(from);
    }

    context.Account.set({
      id: to,
      sbt_id: id,
    });

    context.Soul.set({
      ...defaultSoul(id, to),
      ...existing,
      owner: to,
      type: '',
      role: '',
      stage: 0,
    });
  },
);

indexer.onEvent(
  { contract: 'Soul', event: 'Approval' },
  async () => {},
);

indexer.onEvent(
  { contract: 'Soul', event: 'ApprovalForAll' },
  async () => {},
);

indexer.onEvent({ contract: 'Soul', event: 'URI' }, async ({ event, context }) => {
  const id = tokenId(event.params._1);
  const existing = await context.Soul.get(id);

  if (!existing) {
    return;
  }

  context.Soul.set({
    ...existing,
    uri: event.params._0,
  });
});

indexer.onEvent(
  { contract: 'Soul', event: 'SoulType' },
  async ({ event, context }) => {
    const id = tokenId(event.params._0);
    const existing = await context.Soul.get(id);

    if (!existing) {
      return;
    }

    context.Soul.set({
      ...existing,
      type: event.params._1,
    });
  },
);

indexer.onEvent(
  { contract: 'Soul', event: 'Announcement' },
  async ({ event, context }) => {
    const authorId = tokenId(event.params._1);
    const author = await context.Soul.get(authorId);

    if (!author) {
      return;
    }

    context.SoulPost.set({
      id: eventEntityId(event.block.hash, event.logIndex),
      createdDate: BigInt(event.block.timestamp),
      author_id: authorId,
      uri: event.params._2,
      context: event.params._3,
      metadata: undefined,
    });
  },
);

indexer.onEvent(
  { contract: 'Soul', event: 'SoulHandle' },
  async ({ event, context }) => {
    const id = tokenId(event.params._0);
    const existing = await context.Soul.get(id);

    if (!existing) {
      return;
    }

    context.Soul.set({
      ...existing,
      handle: event.params._1,
    });
  },
);

indexer.onEvent(
  { contract: 'Soul', event: 'OpinionChange' },
  async ({ event, context }) => {
    const sbt = tokenId(event.params._0);
    const contractAddress = normalizeAddress(event.params._1);
    const targetTokenId = tokenId(event.params._2);
    const role = event.params._3;
    const opinionId = `${sbt}_${contractAddress}_${targetTokenId}_${role}`;
    const existing = await context.SoulOpinion.get(opinionId);

    const opinion: SoulOpinion = {
      id: opinionId,
      aEnd_id: sbt,
      bContract: contractAddress,
      bEnd: targetTokenId,
      bSoul_id:
        contractAddress === normalizeAddress(event.srcAddress)
          ? targetTokenId
          : undefined,
      role,
      value: event.params._5,
      ...existing,
    };

    context.SoulOpinion.set({
      ...opinion,
      value: event.params._5,
    });

    if (contractAddress === normalizeAddress(event.srcAddress)) {
      context.SoulOpinionChange.set({
        id: eventEntityId(event.block.hash, event.logIndex),
        subject_id: sbt,
        object_id: targetTokenId,
        role,
        valueBefore: event.params._4,
        valueAfter: event.params._5,
      });
    }
  },
);
