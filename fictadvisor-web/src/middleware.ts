import { PERMISSION } from '@fictadvisor/utils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import PermissionService from '@/lib/services/permission/PermissionService';
import { adminPermissions } from '@/types/adminPermissions';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const tokenCookie = request.cookies.get('access_token');

  await PermissionService.getAdminAccess([adminPermissions[nextUrl.pathname]]);
  // console.log(data);
  console.log(nextUrl.pathname);
  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
