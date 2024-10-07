import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import PermissionService from '@/lib/services/permission/PermissionService';
import { AuthToken } from './lib/constants/AuthToken';
import { PermissionValuesDTO } from '@fictadvisor/utils/requests';
import { client } from './lib/api/instance';
import { PermissionResponse } from './lib/services/permission/types';

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const tokenCookie = cookies.get(AuthToken.AccessToken);
  console.log(nextUrl.pathname);

  if (nextUrl.pathname.startsWith('/admin')) {
    if (!tokenCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const body = {
      permissions: ['adminPanel.teachers.show'],
    };

    // await client.post<PermissionResponse>('/permissions/check', body);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
