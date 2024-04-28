'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TeachersAdminSearch from '@/app/admin/teachers/search/components/teachers-admin-search';
import TeachersTable from '@/app/admin/teachers/search/components/teachers-table';
import { initialValues } from '@/app/admin/teachers/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import teachersApi from '@/lib/api/teacher/TeacherAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<QueryAllTeacherDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(
    ['teachers', currPage, pageSize, params],
    () =>
      teachersApi.getAll({
        ...params,
        pageSize,
        page: currPage,
      }),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const deleteTeacher = async (id: string) => {
    try {
      await TeacherAPI.delete(id);
      refetch();
      toast.success('Викладач успішно видалений!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  const handleChange = (values: QueryAllTeacherDTO) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurrPage(0);
        return values;
      }
      return prevValues;
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
  };
  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <TeachersAdminSearch onSubmit={handleChange} />
      <TeachersTable teachers={data.teachers} deleteTeacher={deleteTeacher} />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={data.pagination.totalAmount}
        page={currPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurrPage(page)}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
      />
    </Box>
  );
};

export default Page;
