import React, { FC } from 'react';

import CommentsEditAdminPage from '@/components/pages/admin/admin-comments/edit-comments/CommentsEditAdminPage';

interface AdminCommentEditProps {
  params: {
    comment: string;
  };
}

const AdminCommentEdit: FC<AdminCommentEditProps> = ({ params }) => {
  const comment = JSON.parse(decodeURIComponent(params.comment));
  return <CommentsEditAdminPage comment={comment} />;
};

export default AdminCommentEdit;
