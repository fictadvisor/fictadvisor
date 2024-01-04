import React from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantPriorityPage from '@/components/pages/priority-approve-page';

const PriorityApprove = () => {
  return (
    <PageLayout title="Дисципліна">
      <EntrantPriorityPage />
    </PageLayout>
  );
};

export default PriorityApprove;
