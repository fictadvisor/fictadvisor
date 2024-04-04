'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { initialValues } from '../common/constants';
import { GroupsSearchFormFields } from '../common/types';

import GroupsAdminSearch from './components/groups-admin-search';
import GroupsTable from './components/groups-table';

const SearchGroupsAdminPage: FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<GroupsSearchFormFields>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(
    ['groups', curPage, pageSize, params],
    () => GroupAPI.getAll(curPage, params, pageSize),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const deleteGroup = async (id: string) => {
    try {
      await GroupAPI.delete(id);
      refetch();
      toast.success('Група успішно видалена!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <GroupsAdminSearch setParams={setParams} />
      <GroupsTable groups={data.groups} deleteGroup={deleteGroup} />
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

export default SearchGroupsAdminPage;
