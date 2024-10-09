'use client';

import { PERMISSION } from '@fictadvisor/utils/security';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import PermissionService from '@/lib/services/permission/PermissionService';

const AdminPanelAccessLayout = ({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: PERMISSION;
}) => {
  // const { user } = useAuthentication();
  //
  // const { data, isLoading } = useQuery({
  //   queryKey: [permission, user],
  //   queryFn: () => PermissionService.getAdminAccess([permission]),
  //   retry: false,
  //   enabled: !!user,
  //   refetchOnWindowFocus: false,
  // });
  // if (isLoading) return <Progress />;

  // if (data && !data[permission]) redirect('/');

  return <>{children}</>;
};

export default AdminPanelAccessLayout;
