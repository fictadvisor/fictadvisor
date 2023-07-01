import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PollPage from '@/components/pages/poll-page';

const Poll: FC = () => {
  return (
    <PageLayout
      title="Опитування"
      description="На сторінці опитування ви зможете пройти опитування для викладача. Ця сторінка створена для збору ваших відгуків та оцінок щодо викладача, його методики викладання та загального враження від занять. "
    >
      <PollPage />
    </PageLayout>
  );
};

export default Poll;
