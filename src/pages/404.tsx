import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import NotFoundPage from '@/components/pages/404-page';

const NotFound: FC = () => {
  return (
    <PageLayout hasFooter={false} title="Сторінку не знайдено" robots="noindex">
      <NotFoundPage />
    </PageLayout>
  );
};

export default NotFound;
