import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';

import config from '../lib/config';
import theme from '../lib/theme';

const Document = () => {
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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: appConfig }}
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
