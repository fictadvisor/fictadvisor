import { ReactNode } from 'react';

import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

interface PersonalTeacherProps {
  params: Promise<{
    teacherId: string;
  }>;
}

export const generateMetadata = async ({ params }: PersonalTeacherProps) => {
  const { teacherId } = await params;
  const info = await TeacherAPI.get(teacherId);

  const title = `${info?.lastName} ${info?.firstName} ${info?.middleName}`;
  const description = info?.description || 'Викладач';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: '/opengraph-images/statistics.jpg',
    },
  };
};

const PersonalTeacherLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default PersonalTeacherLayout;
