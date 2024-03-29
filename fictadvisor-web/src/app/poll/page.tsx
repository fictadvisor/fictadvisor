import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import PollTeacherPage from '@/components/pages/search-pages/poll-teachers-page';

export const metadata: Metadata = {
  title: 'Опитування викладачів | FICE Advisor',
  openGraph: {
    title: 'Опитування викладачів | FICE Advisor',
  },
};
const PollTeacher = () => (
  <PageLayout>
    <PollTeacherPage />
  </PageLayout>
);
export default PollTeacher;
