import { analyticsCatchErrorEvent } from 'utils/analytics';
import { validateEnv } from '../utils';

jest.mock('utils/analytics', () => ({
  analyticsCatchErrorEvent: jest.fn(),
}));

const setBrowserWindow = () => {
  Object.defineProperty(global, 'window', {
    configurable: true,
    value: {},
  });
};

const clearWindow = () => {
  delete (global as Record<string, unknown>).window;
};

describe('validateEnv', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    clearWindow();
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('does not log or track missing env vars during server rendering', () => {
    clearWindow();

    validateEnv('NEXT_PUBLIC_WALLETCONNECT_PROJECTID', '');

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(analyticsCatchErrorEvent).not.toHaveBeenCalled();
  });

  it('logs and tracks missing env vars in the browser', () => {
    setBrowserWindow();

    validateEnv('NEXT_PUBLIC_WALLETCONNECT_PROJECTID', '');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Missing ENV:NEXT_PUBLIC_WALLETCONNECT_PROJECTID',
    );
    expect(analyticsCatchErrorEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Missing ENV: NEXT_PUBLIC_WALLETCONNECT_PROJECTID',
      }),
      {
        name: 'NEXT_PUBLIC_WALLETCONNECT_PROJECTID',
        type: 'missing env',
      },
    );
  });

  it('does nothing when the env var is configured', () => {
    setBrowserWindow();

    validateEnv('NEXT_PUBLIC_WALLETCONNECT_PROJECTID', 'project-id');

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(analyticsCatchErrorEvent).not.toHaveBeenCalled();
  });
});
