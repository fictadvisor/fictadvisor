import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import PollTeacherPage from '@/components/pages/search-pages/poll-teachers-page';
import pollMetadata from '@/lib/metadata/poll';

export const metadata: Metadata = pollMetadata;
const PollTeacher = () => (
  <PageLayout>
    <PollTeacherPage />
  </PageLayout>
);
export default PollTeacher;
