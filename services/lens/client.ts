import axios from 'axios';

export const LENS_GRAPHQL_URL = 'https://api.lens.xyz/graphql';

type LensAccount = {
  address: string;
  owner: string;
  username?: {
    value: string;
    localName: string;
  } | null;
  metadata?: {
    name?: string | null;
    picture?: string | null;
  } | null;
};

type LensAccountsBulkResponse = {
  accountsBulk?: LensAccount[] | null;
};

export type LensProfile = {
  id: string;
  owner: string;
  handle: string;
  displayName?: string;
  imageURI?: string;
  profileUrl?: string;
};

const LENS_ACCOUNTS_BY_OWNER_QUERY = `
  query LensAccountsByOwner($address: EvmAddress!) {
    accountsBulk(request: { ownedBy: [$address] }) {
      address
      owner
      username {
        value
        localName
      }
      metadata {
        name
        picture(request: { useOriginal: true })
      }
    }
  }
`;

async function runLensGraphqlQuery<TData>(
  query: string,
  variables: Record<string, unknown>,
): Promise<TData> {
  try {
    const response = await axios.post(LENS_GRAPHQL_URL, { query, variables });

    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }

    return response.data.data as TData;
  } catch (error: any) {
    throw new Error(
      `Could not query Lens API: ${error?.message ?? 'Unknown error'}`,
    );
  }
}

function getHeyProfileUrl(localName?: string): string | undefined {
  if (!localName) return undefined;
  return `https://hey.xyz/u/${encodeURIComponent(localName)}`;
}

function mapLensAccount(account: LensAccount): LensProfile {
  return {
    id: account.address,
    owner: account.owner,
    handle:
      account.username?.value || account.metadata?.name || account.address,
    displayName: account.metadata?.name || undefined,
    imageURI: account.metadata?.picture || undefined,
    profileUrl: getHeyProfileUrl(account.username?.localName),
  };
}

function pickBestAccount(accounts: LensAccount[]): LensAccount | undefined {
  return (
    accounts.find((account) => account.username && account.metadata?.picture) ||
    accounts.find((account) => account.metadata?.picture) ||
    accounts.find((account) => account.username) ||
    accounts[0]
  );
}

export async function fetchLensProfileByOwner(
  address: string,
): Promise<LensProfile | null> {
  const data = await runLensGraphqlQuery<LensAccountsBulkResponse>(
    LENS_ACCOUNTS_BY_OWNER_QUERY,
    { address },
  );

  const account = pickBestAccount(data.accountsBulk || []);
  return account ? mapLensAccount(account) : null;
}
