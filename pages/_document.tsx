import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

  return (
    <Html>
      <Head>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESC} />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        {hubspotPortalId && (
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src={`https://js-na1.hs-scripts.com/${hubspotPortalId}.js`}
          ></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
