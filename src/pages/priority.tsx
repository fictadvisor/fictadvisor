import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import PriorityPage from '@/components/pages/priority-page/PriorityPage';

const Priority: FC = () => {
  return (
    <PageLayout title="Пріоритети">
      <PriorityPage />
    </PageLayout>
  );
};

export default Priority;
