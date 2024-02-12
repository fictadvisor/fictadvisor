import React, { FC } from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import CommentsAdminEditPage from '@/components/pages/admin/admin-comments/pages/edit-comments-page';

interface AdminCommentEditProps {
  params: {
    comment: string;
  };
}

const AdminCommentEdit: FC<AdminCommentEditProps> = ({ params }) => {
  const comment = JSON.parse(decodeURIComponent(params.comment));
  return (
    <AdminPanelLayout>
      <CommentsAdminEditPage comment={comment} />
    </AdminPanelLayout>
  );
};

export default AdminCommentEdit;
