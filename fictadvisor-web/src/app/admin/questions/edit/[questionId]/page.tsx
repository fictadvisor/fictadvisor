import React, { FC } from 'react';

import EditQuestionsAdminPage from '@/components/pages/admin/admin-questions/edit-questions/EditQuestionsAdminPage';

interface PageProps {
  params: {
    questionId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  return <EditQuestionsAdminPage questionId={params.questionId} />;
};

export default Edit;
