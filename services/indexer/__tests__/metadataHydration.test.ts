import {
  hydrateSoulMetadata,
  hydrateSoulsMetadata,
  scheduleSoulMetadataHydration,
  scheduleSoulsMetadataHydration,
  shouldHydrateSoulMetadata,
} from '../metadataHydration';

describe('metadataHydration', () => {
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn() as any;
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const flushPromises = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  it('loads metadata from the first IPFS gateway and logs the attempt', async () => {
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        attributes: [
          { trait_type: 'First Name', value: 'Alter' },
          { trait_type: 'Last Name', value: 'Ego' },
        ],
        image: 'ipfs://image-cid',
        name: 'Alter Ego',
      }),
    } as Response);

    const soul = await hydrateSoulMetadata({
      id: '9',
      owner: '0x3cd4f2d1b4fe810b9c024b0f99dde37e7b9ed654',
      uri: 'ipfs://QmUrmh5KpEHR3w16iFZK6TGBWqKvpRkDLUzVPr1UiipZZ9',
      metadata: null,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://ipfs.io/ipfs/QmUrmh5KpEHR3w16iFZK6TGBWqKvpRkDLUzVPr1UiipZZ9',
    );
    expect(infoSpy).toHaveBeenCalledWith(
      '[IPFS] Loading metadata',
      expect.objectContaining({ id: '9' }),
    );
    expect(infoSpy).toHaveBeenCalledWith(
      '[IPFS] Loaded metadata',
      expect.objectContaining({ id: '9', gatewayIndex: 0 }),
    );
    expect(soul).toMatchObject({
      metadata: { name: 'Alter Ego' },
      name: 'Alter Ego',
      uriImage: 'ipfs://image-cid',
      uriFirstName: 'Alter',
      uriLastName: 'Ego',
    });
  });

  it('tries the next gateway when a gateway fails', async () => {
    jest
      .mocked(global.fetch)
      .mockRejectedValueOnce(new Error('gateway unavailable'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: 'Fallback Soul' }),
      } as Response);

    const soul = await hydrateSoulMetadata({
      id: '10',
      owner: '0xowner',
      uri: 'ipfs://QmFallback',
      metadata: null,
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledWith(
      '[IPFS] Metadata gateway threw',
      expect.objectContaining({ id: '10', gatewayIndex: 0 }),
    );
    expect(infoSpy).toHaveBeenCalledWith(
      '[IPFS] Loaded metadata',
      expect.objectContaining({ id: '10', gatewayIndex: 1 }),
    );
    expect(soul?.metadata).toEqual({ name: 'Fallback Soul' });
  });

  it('returns the original soul and logs when all gateways fail', async () => {
    jest.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 504,
      statusText: 'Gateway Timeout',
    } as Response);
    const soul = {
      id: '11',
      owner: '0xowner',
      uri: 'ipfs://QmMissing',
      metadata: null,
    };

    const result = await hydrateSoulMetadata(soul);

    expect(result).toBe(soul);
    expect(warnSpy).toHaveBeenCalledWith(
      '[IPFS] Metadata gateways exhausted',
      expect.objectContaining({ id: '11' }),
    );
  });

  it('hydrates collections', async () => {
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Collection Soul' }),
    } as Response);

    const souls = await hydrateSoulsMetadata([
      {
        id: '12',
        owner: '0xowner',
        uri: 'ipfs://QmCollection',
        metadata: null,
      },
    ]);

    expect(souls[0].metadata).toEqual({ name: 'Collection Soul' });
  });

  it('hydrates when the indexer returns an empty hex metadata placeholder', async () => {
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Placeholder Soul' }),
    } as Response);

    const soul = await hydrateSoulMetadata({
      id: '15',
      owner: '0xowner',
      uri: 'ipfs://QmPlaceholder',
      metadata: '0x',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://ipfs.io/ipfs/QmPlaceholder',
    );
    expect(soul?.metadata).toEqual({ name: 'Placeholder Soul' });
  });

  it('reports hydration pending only when URI-backed metadata is missing', () => {
    expect(
      shouldHydrateSoulMetadata({
        id: '16',
        owner: '0xowner',
        uri: 'ipfs://QmPending',
        metadata: '0x',
      }),
    ).toBe(true);
    expect(
      shouldHydrateSoulMetadata({
        id: '17',
        owner: '0xowner',
        uri: 'ipfs://QmReady',
        metadata: { name: 'Ready Soul' },
      }),
    ).toBe(false);
    expect(
      shouldHydrateSoulMetadata({
        id: '18',
        owner: '0xowner',
        metadata: null,
      }),
    ).toBe(false);
  });

  it('schedules single soul hydration without waiting for IPFS', async () => {
    let resolveJson: (value: Record<string, unknown>) => void = () => {};
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () =>
        new Promise((resolve) => {
          resolveJson = resolve;
        }),
    } as Response);
    const onHydrated = jest.fn();

    scheduleSoulMetadataHydration(
      {
        id: '13',
        owner: '0xowner',
        uri: 'ipfs://QmSlow',
        metadata: null,
      },
      onHydrated,
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(onHydrated).not.toHaveBeenCalled();

    await Promise.resolve();
    expect(onHydrated).not.toHaveBeenCalled();

    resolveJson({ name: 'Slow Soul' });
    await flushPromises();

    expect(onHydrated).toHaveBeenCalledWith(
      expect.objectContaining({ metadata: { name: 'Slow Soul' } }),
    );
  });

  it('schedules collection hydration without waiting for IPFS', async () => {
    let resolveJson: (value: Record<string, unknown>) => void = () => {};
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () =>
        new Promise((resolve) => {
          resolveJson = resolve;
        }),
    } as Response);
    const onHydrated = jest.fn();

    scheduleSoulsMetadataHydration(
      [
        {
          id: '14',
          owner: '0xowner',
          uri: 'ipfs://QmSlowCollection',
          metadata: null,
        },
      ],
      onHydrated,
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(onHydrated).not.toHaveBeenCalled();

    await Promise.resolve();
    expect(onHydrated).not.toHaveBeenCalled();

    resolveJson({ name: 'Slow Collection Soul' });
    await flushPromises();

    expect(onHydrated).toHaveBeenCalledWith([
      expect.objectContaining({
        metadata: { name: 'Slow Collection Soul' },
      }),
    ]);
  });
});
