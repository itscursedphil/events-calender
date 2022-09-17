import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const middleware = (req: NextRequest) => {
  // TODO: Dynamically get cookie name from config
  const authCookie = req.cookies.get('events_user');

  // If user is logged in and route is /login, redirect
  if (req.nextUrl.pathname.startsWith('/login') && authCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }
};
