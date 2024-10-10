import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';
import { QueryClient } from '@tanstack/react-query';

import { TeacherInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import { PAGE_SIZE } from '@/app/(main)/(search-pages)/teachers/constants';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import TeacherPage from './TeacherPage';

export async function getData() {
  const queryClient = new QueryClient();
  const queryObj = TeacherInitialValues;
  const page = 0;

  const data = await queryClient.fetchQuery({
    queryKey: ['lecturers', page, queryObj],
    queryFn: () =>
      TeacherAPI.getAll({
        ...queryObj,
        pageSize: PAGE_SIZE,
        page,
      } as QueryAllTeacherDTO),
  });

  return {
    initialTeachers: data.teachers,
    pagination: data.pagination,
    queryObj,
  };
}

export default async function Page() {
  const data = await getData();

  return <TeacherPage {...data} />;
}
