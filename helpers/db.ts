import { MongoClient } from 'mongodb';
import axios from 'axios';

export type HealthStatus = {
  ok: boolean;
  message: string;
};

export async function checkIndexerHealth(): Promise<HealthStatus> {
  const uri =
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_SUBGRAPH_API;

  if (!uri) {
    return {
      ok: false,
      message: 'NEXT_PUBLIC_INDEXER_GRAPHQL_URL is not configured',
    };
  }

  try {
    const response = await axios.post(uri, {
      query: '{ __typename }',
    });

    if (response.data.errors) {
      return {
        ok: false,
        message: `Indexer responded with errors: ${JSON.stringify(
          response.data.errors,
        )}`,
      };
    }

    return {
      ok: true,
      message: 'Indexer is reachable and responded successfully',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `Indexer request failed: ${error?.message ?? 'Unknown error'}`,
    };
  }
}

/** @deprecated Use checkIndexerHealth. */
export const checkSubgraphHealth = checkIndexerHealth;

// Cached client across hot reloads in dev to avoid creating many connections
let cachedMongoClient: MongoClient | null = null;

export async function checkMongoHealth(uri?: string): Promise<HealthStatus> {
  const mongoUri = uri || process.env.MONGODB_URI;

  if (!mongoUri) {
    return {
      ok: false,
      message: 'MONGODB_URI is not configured',
    };
  }

  try {
    if (!cachedMongoClient) {
      cachedMongoClient = new MongoClient(mongoUri);
    }

    const client = await cachedMongoClient.connect();
    await client.db().command({ ping: 1 });

    return {
      ok: true,
      message: 'MongoDB ping successful',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `MongoDB connection failed: ${error?.message ?? 'Unknown error'}`,
    };
  }
}
