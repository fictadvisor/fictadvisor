'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';
import { isAxiosError } from 'axios';

import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineApi from '@/lib/api/discipline/DisciplineAPI';

import { initialValues } from './components/disciplines-admin-search/constants';
import DisciplinesAdminSearch from './components/disciplines-admin-search/DisciplinesAdminSearch';
import { DisciplinesAdminSearchFormFields } from './components/disciplines-admin-search/types';
import DisciplinesTable from './components/disciplines-table/DisciplinesTable';
import * as styles from './DisciplinesAdminPage.styles';

const DisciplinesAdminPage: FC = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] =
    useState<DisciplinesAdminSearchFormFields>(initialValues);
  const toast = useToastError();
  const { data, isLoading, refetch } = useQuery(
    [curPage, 'disciplines', pageSize],
    () => DisciplineApi.getPageDisciplines(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error.response?.data.message);
        }
      },
    },
  );

  const handleChange = (values: DisciplinesAdminSearchFormFields) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurPage(0);
        return values;
      }
      return prevValues;
    });
    refetch();
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <DisciplinesAdminSearch onSubmit={handleChange} />
      <DisciplinesTable disciplines={data?.disciplines} />
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

export default DisciplinesAdminPage;
