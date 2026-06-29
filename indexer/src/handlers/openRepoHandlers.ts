import { indexer, type AccountRelAddress, type Claim, type GameRelAddress, type ProcRelAddress } from 'envio';

const openRepoStringKeyRole = 'role';
const openRepoStringKeyType = 'type';
const claimLinkKeys = new Set(['process', 'task', 'claim']);

const normalizeAddress = (address: string): string => address.toLowerCase();

const defaultClaim = (id: string, createdDate: bigint, type = 'claim'): Claim => ({
  id,
  hub: undefined,
  name: id,
  game_id: undefined,
  type,
  role: '',
  stage: 0,
  createdDate,
  updatedDate: undefined,
});

const getSoulIdByAddress = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  address: string,
): Promise<string | undefined> => {
  const account = await context.Account.get(address);
  return account?.sbt_id;
};

const addSoulAssociation = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  originAddress: string,
  key: string,
  destinationAddress: string,
): Promise<void> => {
  const originSoulId = await getSoulIdByAddress(context, originAddress);
  const destinationSoulId = await getSoulIdByAddress(context, destinationAddress);

  if (!originSoulId || !destinationSoulId) {
    return;
  }

  context.SoulAssoc.set({
    id: `ASSOC_${originSoulId}_${key}_${destinationSoulId}`,
    aEnd_id: originSoulId,
    bEnd_id: destinationSoulId,
    role: key,
    qty: undefined,
  });
};

const addSoulAttribute = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  originAddress: string,
  key: string,
  value: string,
): Promise<void> => {
  const soulId = await getSoulIdByAddress(context, originAddress);

  if (!soulId) {
    return;
  }

  context.SoulAttr.set({
    id: `ATTR_${soulId}_${key}_${value}`,
    aEnd_id: soulId,
    bEnd: value,
    role: key,
  });

  if (key !== openRepoStringKeyRole) {
    return;
  }

  const soul = await context.Soul.get(soulId);

  if (soul) {
    context.Soul.set({
      ...soul,
      role: value,
    });
  }
};

const setEntityString = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  originAddress: string,
  key: string,
  value: string,
): Promise<void> => {
  if (key !== openRepoStringKeyRole && key !== openRepoStringKeyType) {
    return;
  }

  const game = await context.Game.get(originAddress);

  if (game) {
    context.Game.set({
      ...game,
      [key]: value,
    });
    return;
  }

  const claim = await context.Claim.get(originAddress);

  if (claim) {
    context.Claim.set({
      ...claim,
      [key]: value,
    });
  }
};

indexer.onEvent({ contract: 'OpenRepo', event: 'StringSet' }, async ({ event, context }) => {
  const originAddress = normalizeAddress(event.params._0);
  const key = event.params._1;
  const value = event.params._2;

  await addSoulAttribute(context, originAddress, key, value);
  await setEntityString(context, originAddress, key, value);
});

indexer.onEvent({ contract: 'OpenRepo', event: 'AddressSet' }, async ({ event, context }) => {
  const originAddress = normalizeAddress(event.params._0);
  const key = event.params._1;
  const destinationAddress = normalizeAddress(event.params._2);

  await addSoulAssociation(context, originAddress, key, destinationAddress);
});

indexer.onEvent({ contract: 'OpenRepo', event: 'AddressAdd' }, async ({ event, context }) => {
  const originAddress = normalizeAddress(event.params._0);
  const key = event.params._1;
  const destinationAddress = normalizeAddress(event.params._2);
  const relationId = `${originAddress}_${key}_${destinationAddress}`;

  await addSoulAssociation(context, originAddress, key, destinationAddress);

  const game = await context.Game.get(originAddress);

  if (game) {
    const relation: GameRelAddress = {
      id: relationId,
      origin_id: originAddress,
      key,
      value: [destinationAddress],
    };

    context.GameRelAddress.set(relation);

    if (claimLinkKeys.has(key)) {
      const claim = await context.Claim.get(destinationAddress);

      context.Claim.set({
        ...defaultClaim(destinationAddress, BigInt(event.block.timestamp), key),
        ...claim,
        game_id: game.id,
      });
    }

    return;
  }

  const claim = await context.Claim.get(originAddress);

  if (claim) {
    const relation: ProcRelAddress = {
      id: relationId,
      origin_id: originAddress,
      key,
      value: [destinationAddress],
    };

    context.ProcRelAddress.set(relation);
    return;
  }

  const account = await context.Account.get(originAddress);

  if (account) {
    const relation: AccountRelAddress = {
      id: relationId,
      origin_id: originAddress,
      key,
      value: [destinationAddress],
    };

    context.AccountRelAddress.set(relation);
  }
});
