import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import NotFoundPage from '@/components/pages/404-page';
export const metadata: Metadata = {
  title: 'Сторінку не знайдено',
};
export default function NotFound() {
  return (
    <PageLayout hasFooter={false}>
      <NotFoundPage />
    </PageLayout>
  );
}
