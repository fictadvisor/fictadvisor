import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import PersonalTeacherSubjectPage from '@/components/pages/personal-teacher-subject-page';
import disciplineMetadata from '@/lib/metadata/discipline';

export const metadata: Metadata = disciplineMetadata;
const PersonalTeacherSubject = () => (
  <PageLayout>
    <PersonalTeacherSubjectPage />
  </PageLayout>
);

export default PersonalTeacherSubject;
