'use client';
import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import AdminDepartmentsSearch from '@/app/admin/departments/search/components/admin-departments-search';
import AdminDepartmentsTable from '@/app/admin/departments/search/components/admin-departments-table';
import { AdminDepartmentsInitialValues } from '@/app/admin/departments/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

const Page = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(AdminDepartmentsInitialValues, 10);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['cathedras-page', values, currPage, pageSize],

    queryFn: () =>
      CathedraAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      await refetch();
      toast.success('Факультет успішно видалений!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  if (error) {
    displayError(error);
    throw new Error('Something went wrong loading cathedras');
  }

  return (
    <Box sx={{ padding: '16px' }}>
      <AdminDepartmentsSearch
        onSubmit={updateFilters}
        values={values}
        cathedras={data?.cathedras ?? []}
      />
      {isLoading && <LoadPage />}
      {data && (
        <>
          <AdminDepartmentsTable
            departments={data.cathedras}
            handleDelete={handleDelete}
          />
          <TablePagination
            page={currPage}
            count={data.pagination.totalAmount}
            onPageChange={(e, page) => setCurrPage(page)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={e => changePageSize(Number(e.target.value))}
            sx={stylesAdmin.pagination}
          />
        </>
      )}
    </Box>
  );
};

export default Page;
