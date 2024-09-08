'use client';
import React, { useState } from 'react';
import { QueryAllCathedrasDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import AdminDepartmentsSearch from '@/app/admin/departments/search/components/admin-departments-search';
import AdminDepartmentsTable from '@/app/admin/departments/search/components/admin-departments-table';
import { AdminDepartmentsInitialValues } from '@/app/admin/departments/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<QueryAllCathedrasDTO>(
    AdminDepartmentsInitialValues,
  );
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['teachers', params, currPage, pageSize],

    queryFn: () =>
      CathedraAPI.getAll({
        ...params,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  const { data: cathedrasData, isLoading: isLoadingCathedras } = useQuery({
    queryKey: ['cathedras'],
    queryFn: () => CathedraAPI.getAll(),
    ...useQueryAdminOptions,
  });

  if (isLoading || isLoadingCathedras) return <LoadPage />;

  if (!data || !cathedrasData)
    throw new Error('Something went wrong loading cathedras');

  const handleChange = (values: QueryAllCathedrasDTO) => {
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

  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      await refetch();
      toast.success('Факультет успішно видалений!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <AdminDepartmentsSearch
        onSubmit={handleChange}
        cathedras={cathedrasData.cathedras}
      />
      <AdminDepartmentsTable
        departments={data.cathedras}
        handleDelete={handleDelete}
      />
      <TablePagination
        page={currPage}
        count={data.pagination.totalAmount}
        onPageChange={(e, page) => setCurrPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
        sx={stylesAdmin.pagination}
      />
    </Box>
  );
};

export default Page;
