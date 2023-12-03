import React from 'react';
import Head from 'next/head';
import router from 'next/router';

/**
 * HTML Head
 */
const PageHead = ({
  title,
  description,
  iconUrl = '/favicon.png',
  imageUrl = `/favicon.png`,
  path,
  openGraph,
  pageUrl,
  children,
}: {
  title: string;
  description: string;
  imageUrl: string;
  iconUrl: string;
  path: string;
  pageUrl?: string;
  openGraph: any;
  children: React.ReactNode;
}): JSX.Element => {
  const manifest = require('manifest.json');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta
        httpEquiv="content-language"
        content={manifest.locale.split('_')[0]}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" type="image/x-icon" href={iconUrl} />

      <meta property="og:type" content={openGraph?.type || 'website'} />
      <meta property="og:site_name" content={manifest.name} />
      {title && <meta property="og:title" content={title} />}
      <meta
        property="og:description"
        content={description || manifest.description}
      />
      {manifest.locale && (
        <meta property="og:locale" content={manifest.locale} />
      )}
      {pageUrl && <meta property="og:url" content={pageUrl} />}

      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}

      <meta name="twitter:card" content="summary" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}

      {manifest.theme_color && (
        <meta name="theme-color" content={manifest.theme_color} />
      )}
      {iconUrl && <link rel="apple-touch-icon" href={iconUrl} />}
      {manifest.display === 'standalone' ? (
        <meta name="apple-mobile-web-app-capable" content="yes" />
      ) : null}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={manifest.name} />

      {/*
        <link rel='apple-touch-startup-image' href='' />

        <link rel='canonical' href={websiteUrl} />
        <meta property='og:url' content={websiteUrl} />

        <meta name='twitter:site' content={`@${config.landingPage.social.twitter}`} />
      */}

      {/* {config.googleSiteVerification ? (
        <meta
          name="google-site-verification"
          content={config.googleSiteVerification}
        />
      ) : null} */}
      {children}
    </Head>
  );
};
export default PageHead;
