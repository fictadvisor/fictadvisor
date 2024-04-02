'use client';

import React, { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';

import AdminPanel from '@/components/common/layout/admin-panel/AdminPanel';
import useAuthentication from '@/hooks/use-authentication';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import PermissionService from '@/lib/services/permisson/PermissionService';
import { PermissionData } from '@/lib/services/permisson/types';

import * as styles from './AdminPanelLayout.styles';

interface AdminPanelLayoutProps {
  children?: ReactNode;
}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
}: AdminPanelLayoutProps) => {
  const { user } = useAuthentication();

  if (!user) {
    redirect('login');
  }

  return (
    <Box sx={styles.layoutWrapper}>
      <AdminPanel />
      <Box sx={styles.mainContent}>{children}</Box>
    </Box>
  );
};

export default AdminPanelLayout;
