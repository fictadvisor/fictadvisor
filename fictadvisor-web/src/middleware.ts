import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const tokenCookie = request.cookies.get('access_token');

  // const { user } = useAuthentication();

  // const { data, isLoading } = useQuery({
  //   queryKey: [adminPermissions[nextUrl.pathname], user],
  //   queryFn: () =>
  //     PermissionService.getAdminAccess(user!.id, [
  //       adminPermissions[nextUrl.pathname],
  //     ]),
  //   retry: false,
  //   enabled: !!user,
  //   refetchOnWindowFocus: false,
  // });

  if (nextUrl.pathname.includes('admin')) {
    if (!tokenCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
