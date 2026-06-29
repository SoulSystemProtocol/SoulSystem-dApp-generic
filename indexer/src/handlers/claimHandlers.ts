import {
  indexer,
  type Claim,
  type EvtPayment,
  type PaymentTotal,
  type ProcNomination,
  type ProcParticipant,
  type ProcRole,
  type SoulPart,
} from 'envio';

const zeroTokenId = 0n;
const nativeTokenId = '0';

const normalizeAddress = (address: string): string => address.toLowerCase();
const tokenId = (value: bigint): string => value.toString();
const roleEntityId = (contractAddress: string, roleId: string): string =>
  `${contractAddress}_${roleId}`;
const nominationEntityId = (contractAddress: string, nominatedSoulId: string): string =>
  `${contractAddress}_${nominatedSoulId}`;
const eventEntityId = (
  contractAddress: string,
  blockHash: string,
  logIndex: number,
  suffix?: string,
): string => [contractAddress, blockHash, logIndex, suffix].filter(Boolean).join('_');

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

const defaultClaim = (id: string, createdDate: bigint): Claim => ({
  id,
  hub: undefined,
  name: id,
  game_id: undefined,
  type: 'claim',
  role: '',
  stage: 0,
  createdDate,
  updatedDate: undefined,
});

const defaultRole = (
  contractAddress: string,
  ctxId: string,
  roleIdValue: bigint,
): ProcRole => ({
  id: roleEntityId(contractAddress, tokenId(roleIdValue)),
  ctx_id: ctxId,
  name: '',
  uri: '',
  metadata: undefined,
  role: '',
  roleId: roleIdValue,
  souls: [],
  soulsCount: 0,
});

const upsertClaim = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  contractAddress: string,
  createdDate: bigint,
): Promise<Claim> => {
  const existing = await context.Claim.get(contractAddress);
  const claim = existing ?? defaultClaim(contractAddress, createdDate);

  if (!existing) {
    context.Claim.set(claim);
  }

  return claim;
};

const getRoleName = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  contractAddress: string,
  roleIdValue: bigint,
): Promise<string> => {
  const role = await context.ProcRole.get(roleEntityId(contractAddress, tokenId(roleIdValue)));
  return role?.name ?? tokenId(roleIdValue);
};

const recordPayment = async (
  context: Parameters<Parameters<typeof indexer.onEvent>[1]>[0]['context'],
  payment: EvtPayment,
): Promise<void> => {
  context.EvtPayment.set(payment);

  const totalId = `${payment.from}_${payment.to}_${payment.token ?? nativeTokenId}`;
  const existingTotal = await context.PaymentTotal.get(totalId);
  const total: PaymentTotal = {
    id: totalId,
    from: payment.from,
    to: payment.to,
    amount: (existingTotal?.amount ?? 0n) + payment.amount,
    token: payment.token,
  };

  context.PaymentTotal.set(total);
};

indexer.onEvent({ contract: 'Claim', event: 'Stage' }, async ({ event, context }) => {
  const contractAddress = normalizeAddress(event.srcAddress);
  const stage = Number(event.params._0);
  const claim = await upsertClaim(context, contractAddress, BigInt(event.block.timestamp));

  context.Claim.set({
    ...claim,
    stage,
    updatedDate: BigInt(event.block.timestamp),
  });

  const account = await context.Account.get(contractAddress);

  if (!account) {
    return;
  }

  const soul = await context.Soul.get(account.sbt_id);

  if (soul) {
    context.Soul.set({
      ...soul,
      stage,
    });
  }
});

indexer.onEvent(
  { contract: 'Claim', event: 'RoleCreated' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const claim = await upsertClaim(context, contractAddress, BigInt(event.block.timestamp));
    const role = await context.ProcRole.get(roleEntityId(contractAddress, tokenId(event.params._0)));

    context.ProcRole.set({
      ...defaultRole(contractAddress, claim.id, event.params._0),
      ...role,
      name: event.params._1,
      role: event.params._1,
    });
  },
);

indexer.onEvent({ contract: 'Claim', event: 'URI' }, async ({ event, context }) => {
  const contractAddress = normalizeAddress(event.srcAddress);
  const role = await context.ProcRole.get(roleEntityId(contractAddress, tokenId(event.params._1)));

  if (!role) {
    return;
  }

  context.ProcRole.set({
    ...role,
    uri: event.params._0,
  });
});

indexer.onEvent(
  { contract: 'Claim', event: 'TransferByToken' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const claim = await upsertClaim(context, contractAddress, BigInt(event.block.timestamp));
    const fromOwnerToken = event.params._1;
    const toOwnerToken = event.params._2;
    const roleToken = event.params._3;
    const amount = event.params._4;
    const roleTokenId = tokenId(roleToken);
    const roleId = roleEntityId(contractAddress, roleTokenId);
    const existingRole = await context.ProcRole.get(roleId);
    let role = existingRole ?? defaultRole(contractAddress, claim.id, roleToken);

    if (toOwnerToken !== zeroTokenId) {
      const toSbt = tokenId(toOwnerToken);
      const contractAccount = await context.Account.get(contractAddress);

      if (contractAccount) {
        const soulPartId = `${contractAccount.sbt_id}_${toSbt}_${roleTokenId}`;
        const existingSoulPart = await context.SoulPart.get(soulPartId);
        const roleName = await getRoleName(context, contractAddress, roleToken);
        const soulPart: SoulPart = {
          id: soulPartId,
          aEnd_id: contractAccount.sbt_id,
          bEnd_id: toSbt,
          role: existingSoulPart?.role ?? roleName,
          roleId: roleTokenId,
          qty: (existingSoulPart?.qty ?? 0n) + amount,
          uri: existingSoulPart?.uri,
        };

        context.SoulPart.set(soulPart);
      }

      const participantId = `${contractAddress}_${toSbt}`;
      const participant = await context.ProcParticipant.get(participantId);
      const nextParticipant: ProcParticipant = {
        id: participantId,
        entity_id: claim.id,
        sbt_id: toSbt,
        roles: addUnique(participant?.roles ?? [], roleTokenId),
      };

      context.ProcParticipant.set(nextParticipant);
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
      const participant = await context.ProcParticipant.get(participantId);

      if (participant) {
        context.ProcParticipant.set({
          ...participant,
          roles: removeOne(participant.roles, roleTokenId),
        });
      }
    }

    if (fromOwnerToken === zeroTokenId || toOwnerToken === zeroTokenId) {
      if (toOwnerToken !== zeroTokenId) {
        role = {
          ...role,
          souls: addUnique(role.souls, tokenId(toOwnerToken)),
        };

        if (role.name === 'member') {
          const nominationId = nominationEntityId(contractAddress, tokenId(toOwnerToken));
          const nomination = await context.ProcNomination.get(nominationId);

          if (nomination) {
            context.ProcNomination.set({
              ...nomination,
              status: 'accepted',
            });
          }
        }
      }

      if (fromOwnerToken !== zeroTokenId) {
        role = {
          ...role,
          souls: removeOne(role.souls, tokenId(fromOwnerToken)),
        };
      }

      context.ProcRole.set({
        ...role,
        soulsCount: role.souls.length,
      });
    }
  },
);

indexer.onEvent(
  { contract: 'Claim', event: 'Nominate' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const nominator = await context.Account.get(normalizeAddress(event.params._0));
    const nominatedId = tokenId(event.params._1);
    const nominated = await context.Soul.get(nominatedId);

    if (!nominator || !nominated) {
      return;
    }

    const claim = await upsertClaim(context, contractAddress, BigInt(event.block.timestamp));
    const nominationId = nominationEntityId(contractAddress, nominatedId);
    const existing = await context.ProcNomination.get(nominationId);
    const nomination: ProcNomination = {
      id: nominationId,
      claim_id: claim.id,
      createdDate: existing?.createdDate ?? BigInt(event.block.timestamp),
      nominated_id: nominated.id,
      nominator: addUnique(existing?.nominator ?? [], nominator.sbt_id),
      uri: [...(existing?.uri ?? []), event.params._2],
      status: existing?.status ?? 'pending',
    };

    context.ProcNomination.set(nomination);
  },
);

indexer.onEvent({ contract: 'Claim', event: 'Post' }, async ({ event, context }) => {
  const contractAddress = normalizeAddress(event.srcAddress);
  const authorId = tokenId(event.params._1);
  const author = await context.Soul.get(authorId);

  if (!author) {
    return;
  }

  const claim = await upsertClaim(context, contractAddress, BigInt(event.block.timestamp));

  context.ProcPost.set({
    id: eventEntityId(contractAddress, event.block.hash, event.logIndex),
    entity_id: claim.id,
    createdDate: BigInt(event.block.timestamp),
    author_id: author.id,
    entityRole: event.params._2,
    uri: event.params._3,
    metadata: undefined,
  });
});

indexer.onEvent(
  { contract: 'Claim', event: 'PaymentReleased' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const to = normalizeAddress(event.params._0);

    await recordPayment(context, {
      id: eventEntityId(contractAddress, event.block.hash, event.logIndex, nativeTokenId),
      from: contractAddress,
      to,
      amount: event.params._1,
      token: undefined,
    });
  },
);

indexer.onEvent(
  { contract: 'Claim', event: 'ERC20PaymentReleased' },
  async ({ event, context }) => {
    const contractAddress = normalizeAddress(event.srcAddress);
    const to = normalizeAddress(event.params._0);
    const token = normalizeAddress(event.params._1);

    await recordPayment(context, {
      id: eventEntityId(contractAddress, event.block.hash, event.logIndex, token),
      from: contractAddress,
      to,
      amount: event.params._2,
      token,
    });
  },
);
