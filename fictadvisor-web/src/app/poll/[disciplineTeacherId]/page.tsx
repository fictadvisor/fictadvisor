import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PollPage from '@/components/pages/poll-page';

export const metadata: Metadata = {
  title: 'Опитування',
  description:
    'На цій сторінці ти зможеш пройти опитування про викладача. Ця сторінка створена для збору відгуків та оцінок його методики викладання та загального враження від занять. ',
  openGraph: {
    title: 'Опитування',
    description:
      'На цій сторінці ти зможеш пройти опитування про викладача. Ця сторінка створена для збору відгуків та оцінок його методики викладання та загального враження від занять. ',
  },
};

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
