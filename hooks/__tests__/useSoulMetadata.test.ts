import { getSoulMetadataHydrationStateById } from 'hooks/useSoulMetadata';

describe('getSoulMetadataHydrationStateById', () => {
  it('marks only URI-backed souls with missing metadata as hydrating', () => {
    expect(
      getSoulMetadataHydrationStateById([
        {
          id: '1',
          owner: '0xowner',
          uri: 'ipfs://QmPending',
          metadata: null,
        },
        {
          id: '2',
          owner: '0xowner',
          uri: 'ipfs://QmReady',
          metadata: { name: 'Ready Soul' },
        },
        {
          id: '3',
          owner: '0xowner',
          metadata: null,
        },
      ]),
    ).toEqual({
      '1': true,
    });
  });
});
