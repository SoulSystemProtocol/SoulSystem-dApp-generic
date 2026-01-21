import { MongoClient } from 'mongodb';
import axios from 'axios';

export type HealthStatus = {
  ok: boolean;
  message: string;
};

export async function checkSubgraphHealth(): Promise<HealthStatus> {
  const uri = process.env.NEXT_PUBLIC_SUBGRAPH_API;

  if (!uri) {
    return {
      ok: false,
      message: 'NEXT_PUBLIC_SUBGRAPH_API is not configured',
    };
  }

  try {
    // Minimal introspection-like query to avoid heavy load
    const response = await axios.post(uri, {
      query: '{ __typename: __schema }',
    });

    if (response.data.errors) {
      return {
        ok: false,
        message: `Subgraph responded with errors: ${JSON.stringify(
          response.data.errors,
        )}`,
      };
    }

    return {
      ok: true,
      message: 'Subgraph is reachable and responded successfully',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `Subgraph request failed: ${error?.message ?? 'Unknown error'}`,
    };
  }
}

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
