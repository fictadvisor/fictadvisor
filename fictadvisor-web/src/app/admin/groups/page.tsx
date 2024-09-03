'use client';

import React, { useState } from 'react';
import { QueryAllGroupsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { initialValues } from '@/app/admin/groups/common/constants';
import GroupsAdminSearch from '@/app/admin/groups/search/components/groups-admin-search';
import GroupsTable from '@/app/admin/groups/search/components/groups-table';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

const GroupsAdmin = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<QueryAllGroupsDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['groups', currPage, pageSize, params],

    queryFn: () =>
      GroupAPI.getAll({
        ...params,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const deleteGroup = async (id: string) => {
    try {
      await GroupAPI.delete(id);
      await qc.refetchQueries({
        queryKey: ['groups', currPage, pageSize, params],
      });
      toast.success('Група успішно видалена!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
  };
  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <GroupsAdminSearch setParams={setParams} />
      <GroupsTable groups={data.groups} deleteGroup={deleteGroup} />
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

export default GroupsAdmin;
