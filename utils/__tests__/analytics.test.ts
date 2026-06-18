import posthog from 'posthog-js';
import {
  analyticsCatchErrorEvent,
  analyticsEvent,
  isAnalyticsEnabled,
} from '../analytics';

jest.mock('posthog-js', () => ({
  alias: jest.fn(),
  capture: jest.fn(),
  init: jest.fn(),
}));

const setWindowHref = (href: string) => {
  Object.defineProperty(global, 'window', {
    configurable: true,
    value: {
      location: { href },
    },
  });
};

const clearWindow = () => {
  delete (global as Record<string, unknown>).window;
};

describe('analytics utilities', () => {
  afterEach(() => {
    clearWindow();
    jest.clearAllMocks();
  });

  it('disables analytics during server rendering', () => {
    clearWindow();

    expect(isAnalyticsEnabled()).toBe(false);

    analyticsEvent('serverEvent');
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('does not capture events on localhost', () => {
    setWindowHref('http://localhost:3001/souls');

    expect(isAnalyticsEnabled()).toBe(false);

    analyticsEvent('localEvent');
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('captures events outside localhost', () => {
    setWindowHref('https://soulsystem.example/souls');

    expect(isAnalyticsEnabled()).toBe(true);

    analyticsEvent('pageView', { path: '/souls' });
    expect(posthog.capture).toHaveBeenCalledWith('pageView', {
      path: '/souls',
    });
  });

  it('captures error details with additional context', () => {
    setWindowHref('https://soulsystem.example/souls');
    const error = new Error('Indexer failed');

    analyticsCatchErrorEvent(error, { type: 'indexer' });

    expect(posthog.capture).toHaveBeenCalledWith(
      'errorCaught',
      expect.objectContaining({
        errorMessage: 'Indexer failed',
        errorStack: error.stack,
        type: 'indexer',
      }),
    );
  });
});
