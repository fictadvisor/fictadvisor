'use client';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineApi from '@/lib/api/discipline/DisciplineAPI';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

import DisciplinesAdminSearch from './components/disciplines-admin-search/DisciplinesAdminSearch';
import DisciplinesTable from './components/disciplines-table/DisciplinesTable';
import { initialValues } from './constants';
import { DisciplinesAdminSearchFormFields } from './types';

const SearchDisciplinesAdminPage: FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] =
    useState<DisciplinesAdminSearchFormFields>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, refetch, isLoading } = useQuery(
    ['disciplines', params, curPage, pageSize],
    () => DisciplineApi.getPageDisciplines(params, pageSize, curPage),
    useQueryAdminOptions,
  );

  useEffect(() => {
    setCurPage(0);
  }, [params]);

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };
  const deleteDiscipline = async (id: string) => {
    try {
      await DisciplineAPI.deleteDiscipline(id);
      toast.success('Дисципліна успішно видалена', '', 4000);
      refetch();
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <DisciplinesAdminSearch setParams={setParams} />
      <DisciplinesTable
        disciplines={data.disciplines}
        deleteDiscipline={deleteDiscipline}
      />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={data.pagination.totalAmount}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default SearchDisciplinesAdminPage;
