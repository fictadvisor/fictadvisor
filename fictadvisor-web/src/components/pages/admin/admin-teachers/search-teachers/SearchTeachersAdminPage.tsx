'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import teachersApi from '@/lib/api/teacher/TeacherAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import TeachersAdminSearch from './components/teachers-admin-search';
import TeachersTable from './components/teachers-table';
import { initialValues } from './constants';
import { AdminSearchFormFields } from './types';

const SearchTeachersAdminPage: FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<AdminSearchFormFields>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(
    ['teachers', curPage, pageSize, params],
    () => teachersApi.getAdminAll(params, pageSize, curPage),
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

  const handleChange = (values: AdminSearchFormFields) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurPage(0);
        return values;
      }
      return prevValues;
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <TeachersAdminSearch onSubmit={handleChange} />
      <TeachersTable teachers={data.teachers} deleteTeacher={deleteTeacher} />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={data.pagination.totalAmount}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
      />
    </Box>
  );
};

export default SearchTeachersAdminPage;