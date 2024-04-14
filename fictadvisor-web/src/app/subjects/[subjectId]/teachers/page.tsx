import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import SubjectTeacherPage from '@/components/pages/search-pages/subject-teacher-search';
import teacherSubjectMetadata from '@/lib/metadata/teacher-subject';
interface SubjectTeacherPage {
  params: {
    subjectId: string;
  };
}
export const metadata: Metadata = teacherSubjectMetadata;
const SubjectPage: FC<SubjectTeacherPage> = ({ params }) => {
  return (
    <PageLayout>
      <SubjectTeacherPage subjectId={params.subjectId} />
    </PageLayout>
  );
};

export default SubjectPage;
