'use client';
import React, { useState } from 'react';
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
  const [values, setValues] = useState<QueryAllDisciplinesDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['disciplines', values, currPage, pageSize],

    queryFn: () =>
      DisciplineAPI.getPageDisciplines({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

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

  if (error) {
    displayError(error);
    throw new Error('error loading data: ' + error.message);
  }

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <DisciplinesAdminSearch onSumbit={setValues} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default DisciplinesAdminSearchPage;
