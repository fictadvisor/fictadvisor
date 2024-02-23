import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import PersonalTeacherSubjectPage from '@/components/pages/personal-teacher-subject-page';

export const metadata: Metadata = {
  title: 'Дисципліна',
  openGraph: {
    title: 'Дисципліна',
  },
};
const PersonalTeacherSubject = () => (
  <PageLayout>
    <PersonalTeacherSubjectPage />
  </PageLayout>
);

export default PersonalTeacherSubject;
