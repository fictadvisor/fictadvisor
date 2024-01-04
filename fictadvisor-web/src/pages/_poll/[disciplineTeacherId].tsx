import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PollPage from '@/components/pages/poll-page';

const Poll: FC = () => {
  return (
    <PageLayout
      title="Опитування"
      description="На цій сторінці ти зможеш пройти опитування про викладача. Ця сторінка створена для збору відгуків та оцінок його методики викладання та загального враження від занять. "
    >
      <PollPage />
    </PageLayout>
  );
};

export default Poll;
