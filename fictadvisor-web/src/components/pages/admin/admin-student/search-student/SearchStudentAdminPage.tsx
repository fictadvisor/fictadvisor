'use client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import StudentAPI from '@/lib/api/student/StudentAPI';

import { StudentSearchFormFields } from '../common/types';

import HeaderUserSearch from './components/header-student-search';
import { HeaderStudentSearchProps } from './components/header-student-search/HeaderStudentSearch';
import StudentsList from './components/students-list';
import { StudentInitialValues } from './constants';

const SearchStudentAdminPage = () => {
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

export default SearchStudentAdminPage;
