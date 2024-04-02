import React, { FC } from 'react';

import CommentsAdminEditPage from '@/components/pages/admin/admin-comments/pages/edit-comments-page';

interface AdminCommentEditProps {
  params: {
    comment: string;
  };
}

const AdminCommentEdit: FC<AdminCommentEditProps> = ({ params }) => {
  const comment = JSON.parse(decodeURIComponent(params.comment));
  return <CommentsAdminEditPage comment={comment} />;
};

export default AdminCommentEdit;
