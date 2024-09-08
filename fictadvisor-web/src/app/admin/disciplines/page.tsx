'use client';
import React, { useEffect, useState } from 'react';
import { QueryAllDisciplinesDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import DisciplinesTable from '@/app/admin/disciplines/search/components/disciplines-table';
import { initialValues } from '@/app/admin/disciplines/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

import DisciplinesAdminSearch from './search/components/disciplines-admin-search';

const DisciplinesAdminSearchPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<QueryAllDisciplinesDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['disciplines', params, currPage, pageSize],

    queryFn: () =>
      DisciplineAPI.getPageDisciplines({
        ...params,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  useEffect(() => {
    setCurrPage(0);
  }, [params]);

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
  };
  const deleteDiscipline = async (id: string) => {
    try {
      await DisciplineAPI.deleteDiscipline(id);
      toast.success('Дисципліна успішно видалена', '', 4000);
      await refetch();
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
        page={currPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurrPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default DisciplinesAdminSearchPage;
