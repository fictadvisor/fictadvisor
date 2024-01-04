import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import AdminPanel from '@/components/common/layout/admin-panel/AdminPanel';

import * as styles from './AdminPanelLayout.styles';

interface AdminPanelLayoutProps {
  children?: ReactNode;
}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
}: AdminPanelLayoutProps) => {
  return (
    <Box sx={styles.layoutWrapper}>
      <AdminPanel />
      <Box sx={styles.mainContent}>{children}</Box>
    </Box>
  );
};

export default AdminPanelLayout;
