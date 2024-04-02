import React, { FC } from 'react';

import QuestionsEditPage from '@/components/pages/admin/questions-admin-page/components/questions-edit-page';

interface PageProps {
  params: {
    questionId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  return <QuestionsEditPage questionId={params.questionId} />;
};

export default Edit;
