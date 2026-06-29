import assert from 'node:assert/strict';
import { inspect } from 'node:util';

const oldEndpoint = process.env.OLD_INDEXER_GRAPHQL_URL;
const newEndpoint = process.env.NEW_INDEXER_GRAPHQL_URL;

if (!oldEndpoint || !newEndpoint) {
  throw new Error(
    'Set OLD_INDEXER_GRAPHQL_URL and NEW_INDEXER_GRAPHQL_URL before running parity checks.',
  );
}

async function gql(endpoint, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      `GraphQL HTTP ${response.status}: ${inspect(body, { depth: 5 })}`,
    );
  }

  if (body.errors) {
    throw new Error(inspect(body.errors, { depth: 8 }));
  }

  return body.data;
}

const queries = [
  {
    name: 'souls',
    query: `{
      souls(first: 5, skip: 0) {
        id
        owner
        type
        uri
        metadata
        uriImage
        name
      }
    }`,
  },
  {
    name: 'games',
    query: `{
      games(first: 5, skip: 0) {
        id
        name
        type
        role
      }
    }`,
  },
  {
    name: 'claims',
    query: `{
      claims(first: 5, skip: 0) {
        id
        name
        stage
        type
      }
    }`,
  },
  {
    name: 'actions',
    query: `{
      actions(first: 5) {
        id
        subject
        verb
        object
        tool
        uri
        metadata
      }
    }`,
  },
];

for (const item of queries) {
  const oldData = await gql(oldEndpoint, item.query);
  const newData = await gql(newEndpoint, item.query);

  try {
    assert.deepEqual(newData, oldData);
    console.log(`${item.name}: OK`);
  } catch (error) {
    console.error(`${item.name}: mismatch`);
    console.error('Old endpoint data:');
    console.error(inspect(oldData, { depth: 10, colors: false }));
    console.error('New endpoint data:');
    console.error(inspect(newData, { depth: 10, colors: false }));
    throw error;
  }
}
