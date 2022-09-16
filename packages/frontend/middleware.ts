import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  // TODO: Dynamically get cookie name from config
  const authCookie = req.cookies.get('events_user');

  // If user is logged in and route is /login, redirect
  if (req.nextUrl.pathname.startsWith('/login') && authCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }
};
