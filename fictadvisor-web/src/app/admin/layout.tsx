'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { redirect, usePathname } from 'next/navigation';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import PermissionApi from '@/lib/api/permission/PermissionApi';
import getPermissions from '@/lib/utils/getPermissions';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthentication();

  const [permissionGranted, setPermissionGranted] = useState(false);

  const pathname = usePathname();
  const requestedPathname = getPermissions(pathname);
  if (!requestedPathname) redirect('/');

  if (!user) redirect('/login');

  const { data: permissionData, isLoading } = useQuery({
    queryKey: [requestedPathname],
    queryFn: () =>
      PermissionApi.check({
        permissions: [requestedPathname],
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!permissionData?.permissions) redirect('/');

      const permissionCheck = Object.entries(permissionData.permissions).some(
        ([key, value]) => key === requestedPathname && value,
      );

      setPermissionGranted(permissionCheck);

      if (!permissionCheck) redirect('/');
    }
  }, [isLoading, permissionData, requestedPathname]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Progress />
      </Box>
    );
  }

  if (permissionGranted) {
    return <AdminPanelLayout>{children}</AdminPanelLayout>;
  }

  return null;
};

export default DashboardLayout;
