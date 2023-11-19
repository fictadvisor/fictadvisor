'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';
import { isAxiosError } from 'axios';

import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import teachersApi from '@/lib/api/teacher/TeacherAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import TeachersAdminSearch from './components/teachers-admin-search';
import TeachersTable from './components/teachers-table';
import { initialValues } from './constants';
import * as styles from './TeachersAdminPage.styles';
import { AdminSearchFormFields } from './types';

const TeachersAdminPage: FC = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<AdminSearchFormFields>(initialValues);
  const toastError = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(
    ['teachers', curPage, pageSize, params],
    () => teachersApi.getAdminAll(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
    },
  );

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

  const deleteTeacher = async (id: string) => {
    try {
      await TeacherAPI.delete(id);
      refetch();
      toast.success('Викладач успішно видалений!', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e.response?.data.message);
      }
    }
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <TeachersAdminSearch onSubmit={handleChange} />
      <TeachersTable
        teachers={data?.teachers}
        isLoading={isLoading}
        count={pageSize}
        deleteTeacher={deleteTeacher}
      />
      <TablePagination
        sx={styles.pagination}
        count={count}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
      />
    </Box>
  );
};

export default TeachersAdminPage;
