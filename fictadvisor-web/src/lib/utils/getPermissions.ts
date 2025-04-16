import { adminPermissions } from '@/types/adminPermissions';

const getPermissions = (pathname: string) => {
  const pathParts = pathname.split('/');

  for (const part of pathParts.reverse()) {
    const permission = adminPermissions[part];
    if (permission) return permission;
  }
  return null;
};

export default getPermissions;
