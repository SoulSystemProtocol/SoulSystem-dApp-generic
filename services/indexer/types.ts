export type IndexerVariables = Record<string, unknown>;

export type SoulEntity = {
  id: string;
  owner: string;
  type?: string;
  role?: string;
  uri?: string;
  metadata?: string;
  uriImage?: string;
  image?: string;
  name?: string;
  tags?: string[];
  attrs?: Array<{ id: string; role: string; bEnd: string }>;
  participantGame?: Array<{ id: string; roles: string[] }>;
  participantProc?: Array<{ id: string; roles: string[] }>;
};

type DynamicIndexerEntity = Record<string, any>;

export type GameEntity = DynamicIndexerEntity;
export type ClaimEntity = DynamicIndexerEntity;
export type ActionEntity = DynamicIndexerEntity;
export type GameRuleEntity = DynamicIndexerEntity;

export type SoulSearchParams = {
  ids?: string[];
  owners?: string[];
  type?: string;
  first?: number;
  skip?: number;
};

export type GameSearchParams = {
  ids?: string[];
  type?: string;
  first?: number;
  skip?: number;
};

export type ClaimSearchParams = {
  ids?: string[];
  type?: string;
  game?: string;
  first?: number;
  skip?: number;
};

export type GameRuleSearchParams = {
  ids: string[];
  containerId?: string;
  actionGuid?: string;
  isPositive?: boolean;
  isNegative?: boolean;
  isEnabled?: boolean;
};

export type SoulSystemIndexer = {
  findSouls(params: SoulSearchParams): Promise<SoulEntity[]>;
  findGames(params: GameSearchParams): Promise<GameEntity[]>;
  findClaims(params: ClaimSearchParams): Promise<ClaimEntity[]>;
  isGamePart(gameId: string, sbt: string): Promise<boolean>;
  getGameRules(params: GameRuleSearchParams): Promise<GameRuleEntity[]>;
  findActionEntities(guids?: string[]): Promise<ActionEntity[]>;
  getSoulById(id: string): Promise<SoulEntity | null>;
  getSoulByOwner(owner: string): Promise<SoulEntity | null>;
  getSBTForAccount(address: string): Promise<string | undefined>;
};
