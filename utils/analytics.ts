import posthog from 'posthog-js';

const ANALYTICS_LOCALHOST_ENABLE = false;

/**
 *
 */
export const isAnalyticsEnabled = () => {
  return true;
  const isLocalhost =
    window.location.href.includes('127.0.0.1') ||
    window.location.href.includes('localhost');
  return !isLocalhost || ANALYTICS_LOCALHOST_ENABLE;
};

/**
 * Init analytics.
 */
export const initAnalytics = () => {
  if (isAnalyticsEnabled()) {
    if (!!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: 'https://app.posthog.com',
      });
    } else console.error('Env:NEXT_PUBLIC_POSTHOG_KEY is missing');
  } else console.log('Analytics Disabled');
};

/**
 * Generic Analytic Event
 */
export const analyticsEvent = (event: string, properties?: any): void => {
  try {
    if (isAnalyticsEnabled()) posthog.capture(event, properties);
  } catch (error) {
    console.error('[CAUGHT] ' + error);
  }
};

/**
 * Page view event.
 */
export const analyticsPageViewEvent = () => analyticsEvent('pageView');

/**
 * Connect account event
 */
export const analyticsAccountConnect = (account: string): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('accountConnect', {
        account: account.toLowerCase(),
      });
      posthog.alias(account.toLowerCase());
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error);
  }
};

/**
 * Log-Out Event
 */
export const analyticsAccountDisconnect = (): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('accountDisconnect');
      // posthog.reset();
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error);
  }
};

/**
 * Track Errors
 */
export const analyticsCatchErrorEvent = (
  error: Error,
  additional: any = {},
): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('errorCaught', {
        errorMessage: error?.message,
        errorStack: error?.stack,
        ...additional,
      });
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error);
  }
};
