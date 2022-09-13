import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import config from '../lib/config';
import theme from '../lib/theme';

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
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
