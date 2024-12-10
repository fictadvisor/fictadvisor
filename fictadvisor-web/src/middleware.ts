import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { adminPermissions } from '@/types/adminPermissions';

import PermissionApi from './lib/api/permission/PermissionApi';
import { AuthToken } from './lib/constants/AuthToken';

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const tokenCookie = cookies.get(AuthToken.AccessToken);

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const requestedPermission = adminPermissions[nextUrl.pathname];

  const body = {
    permissions: [requestedPermission],
  };

  const data = await PermissionApi.check(body);

  const permissionGranted = Object.entries(data.permissions).some(
    ([key, value]) => key === requestedPermission && value === true,
  );

  if (!permissionGranted) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
