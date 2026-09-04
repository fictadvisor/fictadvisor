'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import HeaderStudentSearch from '@/app/admin/students/search/components/header-student-search/HeaderStudentSearch';
import StudentsList from '@/app/admin/students/search/components/students-list';
import { StudentInitialValues } from '@/app/admin/students/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';

const AdminStudentSearchPage = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(StudentInitialValues, 5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['students', currPage, pageSize, values],

    queryFn: () =>
      StudentAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderStudentSearch onSubmit={updateFilters} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <StudentsList
          currPage={currPage}
          setCurrPage={setCurrPage}
          students={data.students}
          pageSize={pageSize}
          setPageSize={changePageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminStudentSearchPage;
