import { getSoulByOwnerQueryOptions } from 'hooks/useSoulByOwner';

jest.mock('contexts/Web3Context', () => ({
  Web3Context: {},
}));

describe('getSoulByOwnerQueryOptions', () => {
  it('skips the owner query when no hash is available', () => {
    expect(getSoulByOwnerQueryOptions(undefined)).toMatchObject({
      ssr: false,
      skip: true,
      variables: { hash: '' },
    });
  });

  it('skips the owner query when the hash is blank', () => {
    expect(getSoulByOwnerQueryOptions('   ')).toMatchObject({
      ssr: false,
      skip: true,
      variables: { hash: '' },
    });
  });

  it('queries with a normalized hash when the hash is available', () => {
    expect(getSoulByOwnerQueryOptions('  0xABC  ')).toMatchObject({
      ssr: false,
      skip: false,
      variables: { hash: '0xabc' },
    });
  });
});
