import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import config from '../../lib/config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line camelcase
  const { events_user } = req.cookies;

  // eslint-disable-next-line camelcase
  if (events_user) {
    res.setHeader(
      'Set-Cookie',
      serialize(config.authentication.cookie, '', {
        path: '/',
        expires: new Date(0),
      })
    );
  }

  return res.status(200).json({});
};

export default handler;
