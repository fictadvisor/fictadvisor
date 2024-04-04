import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

import { useQueryAdminOptions } from '../../common/constants';

import AdminDepartmentsSearch from './components/admin-departments-search';
import AdminDepartmentsTable from './components/admin-departments-table';
import { AdminDepartmentsInitialValues } from './constants';
import { AdminDepartmentSearchFields } from './types';

const SearchDepartmentsAdminPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<AdminDepartmentSearchFields>(
    AdminDepartmentsInitialValues,
  );
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, refetch, isLoading } = useQuery(
    ['teachers', params, curPage, pageSize],
    () => CathedraAPI.getAll(params, pageSize, curPage),
    useQueryAdminOptions,
  );

  const { data: cathedrasData, isLoading: isLoadingCathedras } = useQuery(
    ['cathedras'],
    () => CathedraAPI.getAll(),
    useQueryAdminOptions,
  );

  if (isLoading || isLoadingCathedras) return <LoadPage />;

  if (!data || !cathedrasData)
    throw new Error('Something went wrong loading cathedras');

  const handleChange = (values: AdminDepartmentSearchFields) => {
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
        page={curPage}
        count={data.pagination.totalAmount}
        onPageChange={(e, page) => setCurPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
        sx={stylesAdmin.pagination}
      />
    </Box>
  );
};

export default SearchDepartmentsAdminPage;
