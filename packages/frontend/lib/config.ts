import { util } from 'config';

export interface API_CONFIG {
  endpoint: string;
}

export interface AUTHENTICATION_CONFIG {
  cookie: string;
}

export interface CONFIG {
  api: API_CONFIG;
  authentication: AUTHENTICATION_CONFIG;
}

const config: CONFIG = util.toObject();

export default config;
