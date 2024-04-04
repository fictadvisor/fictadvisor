'use client';

import { useQuery } from 'react-query';
import { PERMISSION } from '@fictadvisor/utils/security';
import { redirect } from 'next/navigation';

import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import PermissionService from '@/lib/services/permisson/PermissionService';

const AdminPanelAccessLayout = ({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: PERMISSION;
}) => {
  const { user } = useAuthentication();

  const { data, isLoading } = useQuery(
    [permission],
    () => PermissionService.getAdminAccess(user.id, [permission]),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading) return <Progress />;

  if (data && !data[permission]) redirect('/');

  return <>{children}</>;
};

export default AdminPanelAccessLayout;
