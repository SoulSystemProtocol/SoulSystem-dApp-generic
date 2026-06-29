import {
  indexer,
  type Game,
  type GameAssoc,
  type GameParticipant,
  type GameRole,
  type SoulPart,
} from 'envio';

const zeroTokenId = 0n;

const normalizeAddress = (address: string): string => address.toLowerCase();
const tokenId = (value: bigint): string => value.toString();
const roleEntityId = (contractAddress: string, roleId: string): string =>
  `${contractAddress}_${roleId}`;
const eventEntityId = (contractAddress: string, blockHash: string, logIndex: number): string =>
  `${contractAddress}_${blockHash}_${logIndex}`;

const addUnique = (values: readonly string[], value: string): string[] =>
  values.includes(value) ? [...values] : [...values, value];

const removeOne = (values: readonly string[], value: string): string[] => {
  const next = [...values];
  const index = next.indexOf(value);

  if (index >= 0) {
    next.splice(index, 1);
  }

  return next;
};

const defaultGame = (id: string, createdDate: bigint): Game => ({
  id,
  hub: '',
  name: id,
  type: 'game',
  role: '',
  createdDate,
});

const defaultRole = (
  contractAddress: string,
  ctxId: string,
  roleIdValue: bigint,
): GameRole => ({
  id: roleEntityId(contractAddress, tokenId(roleIdValue)),
  ctx_id: ctxId,
  roleId: roleIdValue,
  name: '',
  uri: '',
  metadata: undefined,
  souls: [],
  soulsCount: 0,
});

const upsertGame = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  contractAddress: string,
  createdDate: bigint,
): Promise<Game> => {
  const existing = await context.Game.get(contractAddress);
  const game = existing ?? defaultGame(contractAddress, createdDate);

  if (!existing) {
    context.Game.set(game);
  }

  return game;
};

const getRoleName = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  contractAddress: string,
  roleIdValue: bigint,
): Promise<string> => {
  const role = await context.GameRole.get(roleEntityId(contractAddress, tokenId(roleIdValue)));
  return role?.name ?? '';
};

indexer.onEvent(
  { contract: 'Game', event: 'RoleCreated' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const game = await upsertGame(context, contractAddress, BigInt(event.block.timestamp));
    const role = await context.GameRole.get(roleEntityId(contractAddress, tokenId(event.params._0)));

    context.GameRole.set({
      ...defaultRole(contractAddress, game.id, event.params._0),
      ...role,
      name: event.params._1,
    });
  },
);

indexer.onEvent({ contract: 'Game', event: 'URI' }, async ({ event, context }) => {
  const contractAddress = normalizeAddress(event.srcAddress);
  const role = await context.GameRole.get(roleEntityId(contractAddress, tokenId(event.params._1)));

  if (!role) {
    return;
  }

  context.GameRole.set({
    ...role,
    uri: event.params._0,
  });
});

indexer.onEvent(
  { contract: 'Game', event: 'TransferByToken' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const game = await upsertGame(context, contractAddress, BigInt(event.block.timestamp));
    const fromOwnerToken = event.params._1;
    const toOwnerToken = event.params._2;
    const roleToken = event.params._3;
    const amount = event.params._4;
    const roleTokenId = tokenId(roleToken);
    const roleId = roleEntityId(contractAddress, roleTokenId);
    const existingRole = await context.GameRole.get(roleId);
    let role = existingRole ?? defaultRole(contractAddress, game.id, roleToken);

    if (toOwnerToken !== zeroTokenId) {
      const toSbt = tokenId(toOwnerToken);
      const contractAccount = await context.Account.get(contractAddress);

      if (contractAccount) {
        const soulPartId = `${contractAccount.sbt_id}_${toSbt}_${roleTokenId}`;
        const existingSoulPart = await context.SoulPart.get(soulPartId);
        const roleName = await getRoleName(context, contractAddress, roleToken);
        const nextSoulPart: SoulPart = {
          id: soulPartId,
          aEnd_id: contractAccount.sbt_id,
          bEnd_id: toSbt,
          role: existingSoulPart?.role ?? roleName,
          roleId: roleTokenId,
          qty: (existingSoulPart?.qty ?? 0n) + amount,
          uri: existingSoulPart?.uri,
        };

        context.SoulPart.set(nextSoulPart);
      }

      const participantId = `${contractAddress}_${toSbt}`;
      const participant = await context.GameParticipant.get(participantId);
      const nextParticipant: GameParticipant = {
        id: participantId,
        entity_id: game.id,
        sbt_id: toSbt,
        roles: addUnique(participant?.roles ?? [], roleTokenId),
      };

      context.GameParticipant.set(nextParticipant);

      const assocId = `${contractAddress}_${toSbt}_${roleTokenId}`;
      const assoc = await context.GameAssoc.get(assocId);
      const nextAssoc: GameAssoc = {
        id: assocId,
        bEnt_id: game.id,
        sbt_id: toSbt,
        role: roleToken,
        qty: (assoc?.qty ?? 0n) + amount,
      };

      context.GameAssoc.set(nextAssoc);
    }

    if (fromOwnerToken !== zeroTokenId) {
      const fromSbt = tokenId(fromOwnerToken);
      const contractAccount = await context.Account.get(contractAddress);

      if (contractAccount) {
        const soulPartId = `${contractAccount.sbt_id}_${fromSbt}_${roleTokenId}`;
        const soulPart = await context.SoulPart.get(soulPartId);

        if (soulPart) {
          if (soulPart.qty <= amount) {
            context.SoulPart.deleteUnsafe(soulPartId);
          } else {
            context.SoulPart.set({
              ...soulPart,
              qty: soulPart.qty - amount,
            });
          }
        }
      }

      const participantId = `${contractAddress}_${fromSbt}`;
      const participant = await context.GameParticipant.get(participantId);

      if (participant) {
        context.GameParticipant.set({
          ...participant,
          roles: removeOne(participant.roles, roleTokenId),
        });
      }

      const assocId = `${contractAddress}_${fromSbt}_${roleTokenId}`;
      const assoc = await context.GameAssoc.get(assocId);

      if (assoc) {
        if (assoc.qty <= amount) {
          context.GameAssoc.deleteUnsafe(assocId);
        } else {
          context.GameAssoc.set({
            ...assoc,
            qty: assoc.qty - amount,
          });
        }
      }
    }

    if (fromOwnerToken === zeroTokenId || toOwnerToken === zeroTokenId) {
      if (toOwnerToken !== zeroTokenId) {
        role = {
          ...role,
          souls: addUnique(role.souls, tokenId(toOwnerToken)),
        };
      }

      if (fromOwnerToken !== zeroTokenId) {
        role = {
          ...role,
          souls: removeOne(role.souls, tokenId(fromOwnerToken)),
        };
      }

      context.GameRole.set({
        ...role,
        soulsCount: role.souls.length,
      });
    }
  },
);

indexer.onEvent(
  { contract: 'Game', event: 'Nominate' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const accountAddress = normalizeAddress(event.params._0);
    const nominator = await context.Account.get(accountAddress);
    const nominatedId = tokenId(event.params._1);
    const nominated = await context.Soul.get(nominatedId);

    if (!nominator || !nominated) {
      return;
    }

    const game = await upsertGame(context, contractAddress, BigInt(event.block.timestamp));

    context.GameNomination.set({
      id: eventEntityId(contractAddress, event.block.hash, event.logIndex),
      game_id: game.id,
      createdDate: BigInt(event.block.timestamp),
      nominator_id: nominator.sbt_id,
      nominated_id: nominated.id,
    });
  },
);

indexer.onEvent({ contract: 'Game', event: 'Post' }, async ({ event, context }) => {
  const contractAddress = normalizeAddress(event.srcAddress);
  const authorId = tokenId(event.params._1);
  const author = await context.Soul.get(authorId);

  if (!author) {
    return;
  }

  const game = await upsertGame(context, contractAddress, BigInt(event.block.timestamp));

  context.GamePost.set({
    id: eventEntityId(contractAddress, event.block.hash, event.logIndex),
    entity_id: game.id,
    createdDate: BigInt(event.block.timestamp),
    author_id: author.id,
    entityRole: event.params._2,
    uri: event.params._3,
    metadata: undefined,
  });
});
