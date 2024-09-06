'use client';

import React, { useState } from 'react';
import { QueryAllStudentDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import HeaderUserSearch, {
  HeaderStudentSearchProps,
} from '@/app/admin/students/search/components/header-student-search/HeaderStudentSearch';
import StudentsList from '@/app/admin/students/search/components/students-list';
import { StudentInitialValues } from '@/app/admin/students/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import StudentAPI from '@/lib/api/student/StudentAPI';

const AdminStudentSearchPage = () => {
  const [queryObj, setQueryObj] =
    useState<QueryAllStudentDTO>(StudentInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['students', currPage, pageSize, queryObj],

    queryFn: () =>
      StudentAPI.getAll({
        ...queryObj,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const submitHandler: HeaderStudentSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));
  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} />
      <StudentsList
        currPage={currPage}
        setCurrPage={setCurrPage}
        students={data.students}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
        refetch={refetch}
      />
    </Box>
  );
};

export default AdminStudentSearchPage;
