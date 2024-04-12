'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { StudentSearchFormFields } from '@/app/admin/students/common/types';
import HeaderUserSearch, {
  HeaderStudentSearchProps,
} from '@/app/admin/students/search/components/header-student-search/HeaderStudentSearch';
import StudentsList from '@/app/admin/students/search/components/students-list';
import { StudentInitialValues } from '@/app/admin/students/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import StudentAPI from '@/lib/api/student/StudentAPI';

const AdminStudentSearchPage = () => {
  const [queryObj, setQueryObj] =
    useState<StudentSearchFormFields>(StudentInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ['students', curPage, pageSize, queryObj],
    async () => await StudentAPI.getAll(curPage, queryObj, pageSize),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const submitHandler: HeaderStudentSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));
  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} />
      <StudentsList
        curPage={curPage}
        setCurPage={setCurPage}
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
