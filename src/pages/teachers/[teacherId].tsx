import { FC } from 'react';
import { useQuery } from 'react-query';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PersonalTeacherPage from '@/components/pages/personal-teacher-page';
import useAuthentication from '@/hooks/use-authentication';
import { client } from '@/lib/api/instance';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import TeacherService from '@/lib/services/teacher/TeacherService';
import { Teacher } from '@/types/teacher';
export interface PersonalTeacherProps {
  info: Teacher | undefined;
}
export const getStaticPaths = async () => {
  const { data } = await client.get('/teachers');
  const paths = data.teachers.map((teacher: { id: string }) => ({
    params: { teacherId: teacher.id },
  }));

  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<
  PersonalTeacherProps
> = async context => {
  const teacherId = context.params?.teacherId as string;

  try {
    const info = await TeacherAPI.get(teacherId);
    return {
      props: {
        info,
      },
    };
  } catch (error) {
    return { props: { info: undefined } };
  }
};

const PersonalTeacher: FC<PersonalTeacherProps> = ({ info }) => {
  const router = useRouter();
  const { query } = router;
  const teacherId = info?.id as string;
  const { user } = useAuthentication();

  const { isLoading, isError, data } = useQuery(
    ['teacher', teacherId],
    () => TeacherService.getTeacherPageInfo(teacherId, user?.id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  if (!info) {
    router.push('/teachers');
    return null;
  }

  return (
    <PageLayout
      title={info?.lastName + ' ' + info?.firstName + ' ' + info?.middleName}
      description={info?.description || 'Викладач'}
    >
      <PersonalTeacherPage
        isLoading={isLoading}
        isError={isError}
        teacher={info as Teacher}
        data={data}
        query={query}
        teacherId={teacherId}
        router={router}
      />
    </PageLayout>
  );
};

export default PersonalTeacher;
