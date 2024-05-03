import { ReactNode } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

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

const PersonalTeacherLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default PersonalTeacherLayout;
