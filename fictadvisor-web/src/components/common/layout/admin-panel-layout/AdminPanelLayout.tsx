'use client';

import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';

import AdminPanel from '@/components/common/layout/admin-panel/AdminPanel';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';

import * as styles from './AdminPanelLayout.styles';

interface AdminPanelLayoutProps {
  children?: ReactNode;
}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
}: AdminPanelLayoutProps) => {
  // const { user } = useAuthentication();
  //
  // if (!user) {
  //   redirect('login');
  // }

  return (
    <Box sx={styles.layoutWrapper}>
      <AdminPanel />
      <Box sx={styles.mainContent}>{children}</Box>
    </Box>
  );
};

export default AdminPanelLayout;
