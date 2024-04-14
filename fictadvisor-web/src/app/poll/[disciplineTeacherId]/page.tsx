import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PollPage from '@/components/pages/poll-page';
import teacherPollMetadata from '@/lib/metadata/teacher-poll';

export const metadata: Metadata = teacherPollMetadata;

interface PollParams {
  params: {
    disciplineTeacherId: string;
  };
}

const Poll: FC<PollParams> = ({ params }) => {
  const disciplineTeacherId = params.disciplineTeacherId;

  return (
    <PageLayout>
      <PollPage disciplineTeacherId={disciplineTeacherId} />
    </PageLayout>
  );
};

export default Poll;
