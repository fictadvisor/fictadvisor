'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';
import { isAxiosError } from 'axios';

import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { initialValues } from '../common/constants/Options';
import { GroupsSearchFormFields } from '../common/types';

import GroupsAdminSearch from './components/groups-admin-search';
import GroupsTable from './components/groups-table';
import * as styles from './AdminGroupsPage.styles';

const AdminGroupsPage: FC = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<GroupsSearchFormFields>(initialValues);
  const toastError = useToastError();
  const toast = useToast();
  const { data, isLoading, refetch } = useQuery(
    ['groups', curPage, pageSize, params],
    () => GroupAPI.getAll(curPage, params, pageSize),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => toastError.displayError(error),
    },
  );

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  const deleteGroup = async (id: string) => {
    try {
      await GroupAPI.delete(id);
      refetch();
      toast.success('Група успішно видалена!', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <GroupsAdminSearch setParams={setParams} />
      <GroupsTable
        groups={data?.groups}
        isLoading={isLoading}
        count={pageSize}
        deleteGroup={deleteGroup}
      />
      <TablePagination
        sx={styles.pagination}
        count={count}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
      />
    </Box>
  );
};

export default AdminGroupsPage;
