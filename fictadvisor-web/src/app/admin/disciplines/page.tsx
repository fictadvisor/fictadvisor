'use client';
import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import DisciplinesTable from '@/app/admin/disciplines/search/components/disciplines-table';
import { initialValues } from '@/app/admin/disciplines/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

import DisciplinesAdminSearch from './search/components/disciplines-admin-search';

const DisciplinesAdminSearchPage = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(initialValues, 10);
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

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

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
      <DisciplinesAdminSearch onSumbit={updateFilters} values={values} />
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
            onRowsPerPageChange={e => changePageSize(Number(e.target.value))}
          />
        </>
      )}
    </Box>
  );
};

export default DisciplinesAdminSearchPage;
