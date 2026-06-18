import axios from 'axios';
import { runIndexerGraphqlQuery } from '../graphqlClient';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

const clearIndexerEnv = () => {
  delete process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL;
  delete process.env.NEXT_PUBLIC_SUBGRAPH_API;
};

describe('runIndexerGraphqlQuery', () => {
  beforeEach(() => {
    clearIndexerEnv();
    mockedAxios.post.mockReset();
  });

  afterEach(() => {
    clearIndexerEnv();
  });

  it('fails before making a request when no endpoint is configured', async () => {
    await expect(runIndexerGraphqlQuery('{ __typename }')).rejects.toThrow(
      'Indexer GraphQL endpoint is not configured',
    );
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('posts to NEXT_PUBLIC_INDEXER_GRAPHQL_URL with query variables', async () => {
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL =
      'https://indexer.example/graphql';
    process.env.NEXT_PUBLIC_SUBGRAPH_API = 'https://legacy.example/graphql';
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          soul: { id: '1' },
        },
      },
    });

    const result = await runIndexerGraphqlQuery<{ soul: { id: string } }>(
      'query Soul($id: ID!) { soul(id: $id) { id } }',
      { id: '1' },
    );

    expect(result).toEqual({ soul: { id: '1' } });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://indexer.example/graphql',
      {
        query: 'query Soul($id: ID!) { soul(id: $id) { id } }',
        variables: { id: '1' },
      },
    );
  });

  it('falls back to the legacy subgraph endpoint while migration support exists', async () => {
    process.env.NEXT_PUBLIC_SUBGRAPH_API = 'https://legacy.example/graphql';
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          __typename: 'RootQuery',
        },
      },
    });

    const result = await runIndexerGraphqlQuery<{ __typename: string }>(
      '{ __typename }',
    );

    expect(result).toEqual({ __typename: 'RootQuery' });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://legacy.example/graphql',
      {
        query: '{ __typename }',
        variables: {},
      },
    );
  });

  it('wraps GraphQL response errors with indexer context', async () => {
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL =
      'https://indexer.example/graphql';
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        errors: [{ message: 'Cannot query field "souls"' }],
      },
    });

    await expect(runIndexerGraphqlQuery('{ souls { id } }')).rejects.toThrow(
      'Could not query the indexer: [{"message":"Cannot query field \\"souls\\""}]',
    );
  });
});
