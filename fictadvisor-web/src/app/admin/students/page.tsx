'use client';

import React, { useState } from 'react';
import { QueryAllStudentsDTO } from '@fictadvisor/utils/requests';
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
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';

const AdminStudentSearchPage = () => {
  const [values, setValues] =
    useState<QueryAllStudentsDTO>(StudentInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['students', currPage, pageSize, values],

    queryFn: () =>
      StudentAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  const submitHandler: HeaderStudentSearchProps['onSubmit'] = query =>
    setValues(prev => ({ ...prev, ...query }));

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <StudentsList
          currPage={currPage}
          setCurrPage={setCurrPage}
          students={data.students}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminStudentSearchPage;
