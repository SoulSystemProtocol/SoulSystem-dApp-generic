import axios from 'axios';
import {
  fetchLensProfileByOwner,
  LENS_GRAPHQL_URL,
} from 'services/lens/client';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

describe('fetchLensProfileByOwner', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it('queries the Lens API for accounts owned by the wallet address', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          accountsBulk: [],
        },
      },
    });

    await fetchLensProfileByOwner('0x1234');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      LENS_GRAPHQL_URL,
      expect.objectContaining({
        variables: { address: '0x1234' },
      }),
    );
    const requestBody = mockedAxios.post.mock.calls[0][1] as {
      query: string;
    };

    expect(requestBody.query).toContain('ownedBy');
  });

  it('returns the best owned account mapped to the existing profile shape', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          accountsBulk: [
            {
              address: '0xAccountWithoutImage',
              owner: '0xOwner',
              username: {
                value: 'lens/plain',
                localName: 'plain',
              },
              metadata: null,
            },
            {
              address: '0xAccountWithImage',
              owner: '0xOwner',
              username: {
                value: 'lens/avatar',
                localName: 'avatar',
              },
              metadata: {
                name: 'Avatar Account',
                picture: 'ipfs://avatar',
              },
            },
          ],
        },
      },
    });

    await expect(fetchLensProfileByOwner('0xOwner')).resolves.toEqual({
      id: '0xAccountWithImage',
      owner: '0xOwner',
      handle: 'lens/avatar',
      displayName: 'Avatar Account',
      imageURI: 'ipfs://avatar',
      profileUrl: 'https://hey.xyz/u/avatar',
    });
  });

  it('returns null when the owner has no Lens accounts', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          accountsBulk: [],
        },
      },
    });

    await expect(fetchLensProfileByOwner('0xOwner')).resolves.toBeNull();
  });

  it('wraps Lens GraphQL errors with API context', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        errors: [{ message: 'Invalid address' }],
      },
    });

    await expect(fetchLensProfileByOwner('bad')).rejects.toThrow(
      'Could not query Lens API',
    );
  });
});
