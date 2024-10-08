import { PERMISSION } from '@fictadvisor/utils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import PermissionService from '@/lib/services/permission/PermissionService';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const tokenCookie = request.cookies.get('access_token');

  const user = await AuthAPI.getMe();

  if (nextUrl.pathname.includes('admin')) {
    if (!tokenCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
