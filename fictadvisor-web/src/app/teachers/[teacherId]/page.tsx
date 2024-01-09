import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PersonalTeacherPage from '@/components/pages/personal-teacher-page';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Teacher } from '@/types/teacher';
interface PersonalTeacherProps {
  params: {
    teacherId: string;
  };
}

export const generateMetadata = async ({ params }: PersonalTeacherProps) => {
  const teacherId = params.teacherId;
  const info = await TeacherAPI.get(teacherId);
  return {
    title: info?.lastName + ' ' + info?.firstName + ' ' + info?.middleName,
    description: info?.description || 'Викладач',
  };
};

const PersonalTeacher: FC<PersonalTeacherProps> = async ({ params }) => {
  const teacherId = params.teacherId;
  const info = await TeacherAPI.get(teacherId);

  return (
    <PageLayout>
      <PersonalTeacherPage teacher={info as Teacher} teacherId={teacherId} />
    </PageLayout>
  );
};

export default PersonalTeacher;
