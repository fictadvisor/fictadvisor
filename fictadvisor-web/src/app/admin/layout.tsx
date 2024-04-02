import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
