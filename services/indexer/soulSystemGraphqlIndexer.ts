import { IS_GAMES_CREATED_BY_NOT_HUB_DISABLED } from 'constants/features';
import { hexStringToJson } from 'utils/converters';
import { runIndexerGraphqlQuery } from './graphqlClient';
import {
  hydrateSoulMetadata,
  hydrateSoulsMetadata,
} from './metadataHydration';
import type {
  ActionEntity,
  ClaimEntity,
  GameEntity,
  GameRuleEntity,
  SoulEntity,
  SoulSystemIndexer,
} from './types';

type SoulsResponse = { souls: SoulEntity[] };
type SoulResponse = { soul?: SoulEntity | null };
type GamesResponse = { games: GameEntity[] };
type ClaimsResponse = { claims: ClaimEntity[] };
type GameParticipantsResponse = { gameParticipants: Array<{ id: string }> };
type GameRulesResponse = { gameRules: GameRuleEntity[] };
type ActionsResponse = { actions: ActionEntity[] };
type AccountResponse = { account?: { sbt?: { id: string } } | null };

export const soulSystemGraphqlIndexer: SoulSystemIndexer = {
  async findSouls({ ids, owners, type, first, skip }) {
    const fixedOwners = owners
      ? owners.map((owner) => owner.toLowerCase())
      : undefined;
    const response = await runIndexerGraphqlQuery<SoulsResponse>(
      getFindSoulsQuery(ids, fixedOwners, type, first, skip),
    );
    return hydrateSoulsMetadata(response.souls);
  },

  async findGames({ ids, type, first, skip }) {
    const response = await runIndexerGraphqlQuery<GamesResponse>(
      getFindGamesQuery(ids, type, first, skip),
    );
    return response.games;
  },

  async findClaims({ ids, type, game, first, skip }) {
    const response = await runIndexerGraphqlQuery<ClaimsResponse>(
      getFindClaimsQuery(ids, type, game, first, skip),
    );
    return response.claims;
  },

  async isGamePart(gameId, sbt) {
    const query = `
      query GetPart($sbt: ID!, $gameId: ID!) {
        gameParticipants(where: { sbt: $sbt, entity: $gameId }) {
          id
        }
      }
    `;
    const response = await runIndexerGraphqlQuery<GameParticipantsResponse>(
      query,
      { sbt, gameId },
    );
    return response.gameParticipants.length > 0;
  },

  async getGameRules({
    ids,
    containerId,
    actionGuid,
    isPositive,
    isNegative,
    isEnabled,
  }) {
    const adjustedIds = ids.length ? ids.map((id) => id.toLowerCase()) : [];
    const adjustedContainerId = containerId?.toLowerCase();
    const response = await runIndexerGraphqlQuery<GameRulesResponse>(
      findGameRulesQuery(
        adjustedIds,
        adjustedContainerId,
        actionGuid,
        isPositive,
        isNegative,
        isEnabled,
      ),
    );

    return response.gameRules.map((ruleEntity) => {
      const metadata =
        typeof ruleEntity?.metadata === 'string'
          ? hexStringToJson(ruleEntity.metadata)
          : ruleEntity?.metadata;

      return {
        ...ruleEntity,
        about:
          typeof ruleEntity?.about === 'object'
            ? ruleEntity?.about?.id
            : ruleEntity?.about,
        metadata,
        confirmation: {
          ruling: ruleEntity?.confirmationRuling,
          evidence: ruleEntity?.confirmationEvidence,
          witness: ruleEntity?.confirmationWitness,
        },
        rule: {
          about:
            typeof ruleEntity?.about === 'object'
              ? ruleEntity?.about?.id
              : ruleEntity?.about,
          affected: ruleEntity?.affected,
          uri: ruleEntity?.uri,
          metadata,
          negation: ruleEntity?.negation,
        },
      };
    });
  },

  async findActionEntities(guids) {
    const response = await runIndexerGraphqlQuery<ActionsResponse>(
      getFindActionEntitiesQuery(guids),
    );
    return response.actions;
  },

  async getSoulById(id) {
    const response = await runIndexerGraphqlQuery<SoulResponse>(
      SoulByIdQuery(id),
    );
    return hydrateSoulMetadata(response?.soul ?? null);
  },

  async getSoulByOwner(owner) {
    const response = await runIndexerGraphqlQuery<SoulsResponse>(
      SoulByHashQuery(owner),
    );
    return hydrateSoulMetadata(response?.souls[0] ?? null);
  },

  async getSBTForAccount(address) {
    const response = await runIndexerGraphqlQuery<AccountResponse>(
      `
      query GetSBTId($address: ID!) {
        account(id: $address) {
          sbt {
            id
          }
        }
      }
      `,
      { address },
    );
    return response?.account?.sbt?.id;
  },
};

export function SoulByIdQuery(id: string) {
  return `{
    soul(id: ${id}) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      name
      tags
      attrs {
        id
        role
        bEnd
      }
    }
  }`;
}

export function SoulByHashQuery(hash: string) {
  return `{
    souls(where: { owner: "${hash}" }) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      name
      tags
      attrs {
        id
        role
        bEnd
      }
    }
  }`;
}

function getFindSoulsQuery(
  ids?: string[],
  owners?: string[],
  type?: string,
  first?: number,
  skip?: number,
) {
  const idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  const ownersFilter = owners ? `owner_in: ["${owners.join('","')}"]` : '';
  const typeFilter = type !== undefined ? `type: "${type}"` : '';
  const filterParams = `where: {${idsFilter}, ${ownersFilter}, ${typeFilter}}`;
  const paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
      souls(${filterParams}, ${paginationParams}) {
        id
        owner
        type
        uri
        metadata
        uriImage
        name
        participantGame {
          id
          roles
        }
        participantProc {
          id
          roles
        }
      }
    }`;
}

function getFindGamesQuery(
  ids?: string[],
  type?: string,
  first?: number,
  skip?: number,
) {
  const idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  const typeFilter = type ? `type: "${type}"` : '';
  const hubFilter = IS_GAMES_CREATED_BY_NOT_HUB_DISABLED
    ? `hub: "${process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS?.toLowerCase()}"`
    : '';
  const filterParams = `where: {${idsFilter}, ${typeFilter}, ${hubFilter}}`;
  const paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
    games(${filterParams}, ${paginationParams}) {
      id
      name
      type
      role
      roles {
        id
        roleId
        name
        souls
        soulsCount
      }
      nominations {
        id
        createdDate
        nominator {
          id
        }
        nominated {
          id
        }
      }
      posts {
        id
        createdDate
        entityRole
        author {
          id
          owner
          name
          uriImage
        }
        uri
        metadata
      }
    }
  }`;
}

function getFindClaimsQuery(
  ids?: string[],
  type?: string,
  game?: string,
  first?: number,
  skip?: number,
) {
  const idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  const typeFilter = type ? `type: "${type}"` : '';
  const gameFilter = game ? `game: "${game}"` : '';
  const filterParams = `where: {${idsFilter}, ${typeFilter}, ${gameFilter}}`;
  const paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
    claims(${filterParams}, ${paginationParams}) {
      id
      name
      stage
      type
      game {
        id
        name
        type
        role
      }
      roles {
        id
        name
        roleId
        souls
        soulsCount
      }
      nominations {
        id
        uri
        createdDate
        nominator {
          id
          owner
          type
        }
        nominated {
          id
          owner
          type
        }
      }
      posts {
        id
        createdDate
        entityRole
        author {
          id
          owner
          name
          uriImage
        }
        uri
        metadata
      }
    }
  }`;
}

function getFindActionEntitiesQuery(guids?: string[]) {
  let queryParams = `first: 100`;
  if (guids && guids.length > 0) {
    if (guids.length == 1) {
      queryParams = `where: {id: "${guids[0]}"}`;
    } else if (guids.length > 1) {
      queryParams = `first: 100, where: {id_in: ["${guids.join('","')}"]}`;
    }
  }
  return `{
    actions(${queryParams}) {
      id
      subject
      verb
      object
      tool
      uri
      metadata
      rules {
        id
        affected
        uri
        negation
        confirmationRuling
        confirmationEvidence
        confirmationWitness
        effects {
          name
          direction
          value
        }
      }
    }
  }`;
}

function findGameRulesQuery(
  ids: string[],
  containerId?: string,
  actionGuid?: string,
  isPositive?: boolean,
  isNegative?: boolean,
  isEnabled?: boolean,
) {
  const idsFilter = ids.length ? `id_in: ["${ids.join('","')}"]` : '';
  const gameFilter = containerId ? `game: "${containerId}"` : '';
  const actionGuidFilter = actionGuid ? `about: "${actionGuid}"` : '';
  const isPositiveFilter = isPositive === true ? 'isPositive: true' : '';
  const isNegativeFilter = isNegative === true ? 'isPositive: false' : '';
  const isEnabledFilter = isEnabled === true ? 'isDisabled: false' : '';
  const filterParams = `where: {${idsFilter}, ${gameFilter}, ${actionGuidFilter}, ${isPositiveFilter}, ${isNegativeFilter}, ${isEnabledFilter}}`;
  const paginationParams = `first: 100`;
  return `{
    gameRules(${filterParams}, ${paginationParams}) {
      id
      about {
        id
      }
      ruleId
      affected
      uri
      metadata
      negation
      confirmationRuling
      confirmationEvidence
      confirmationWitness
      effects {
        name
        direction
        value
      }
      isPositive
      isDisabled
    }
  }`;
}
