import { Html, Head, Main, NextScript } from 'next/document';
import config from '../lib/config';

export default function Document() {
  const appConfig = JSON.stringify({
    api: {
      endpoint: config.api.endpoint,
    },
  });

  return (
    <Html>
      <Head>
        <script
          id="APP_CONFIG"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: appConfig }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
