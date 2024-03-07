import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import AdminDepartmentsSearch from '@/components/pages/admin/admin-departments/admin-departments-search-page/components/admin-departments-search/AdminDepartmentsSearch';
import { AdminDepartmentSearchFields } from '@/components/pages/admin/admin-departments/admin-departments-search-page/components/admin-departments-search/types';
import AdminDepartmentsTable from '@/components/pages/admin/admin-departments/admin-departments-search-page/components/admin-departments-table/AdminDepartmentsTable';
import { AdminDepartmentsInitialValues } from '@/components/pages/admin/admin-departments/admin-departments-search-page/constants/AdminDepartmentsInitialValues';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';

import * as styles from './AdminDepartmentsSearchPage.styles';

const AdminDepartmentSearchPage = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<AdminDepartmentSearchFields>(
    AdminDepartmentsInitialValues,
  );
  const { displayError } = useToastError();
  const { data, isLoading, refetch } = useQuery(
    [curPage, 'teachers', pageSize],
    () => CathedraAPI.getAll(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => {
        displayError(error);
      },
    },
  );
  const handleChange = (values: AdminDepartmentSearchFields) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurPage(0);
        return values;
      }
      return prevValues;
    });
    refetch();
  };
  if (!data) return <div>Loading...</div>;

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={styles.page}>
      <AdminDepartmentsSearch onSubmit={handleChange} />
      <AdminDepartmentsTable
        departments={data.cathedras}
        isLoading={isLoading}
        refetch={refetch}
      />
      <TablePagination
        page={curPage}
        count={count}
        onPageChange={(e, page) => setCurPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
        sx={styles.pagination}
      />
    </Box>
  );
};

export default AdminDepartmentSearchPage;
