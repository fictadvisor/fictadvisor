import React, { FC } from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import QuestionsEditPage from '@/components/pages/admin/questions-admin-page/components/questions-edit-page';

interface PageProps {
  params: {
    questionId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  return (
    <AdminPanelLayout>
      <QuestionsEditPage questionId={params.questionId} />
    </AdminPanelLayout>
  );
};

export default Edit;
