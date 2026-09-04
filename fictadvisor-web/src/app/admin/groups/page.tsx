'use client';

import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { initialValues } from '@/app/admin/groups/common/constants';
import GroupsAdminSearch from '@/app/admin/groups/search/components/groups-admin-search';
import GroupsTable from '@/app/admin/groups/search/components/groups-table';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

const GroupsAdmin = () => {
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
    queryKey: ['groups', currPage, pageSize, values],

    queryFn: () =>
      GroupAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

  const deleteGroup = async (id: string) => {
    try {
      await GroupAPI.delete(id);
      await refetch();
      toast.success('Група успішно видалена!', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <GroupsAdminSearch onSumbit={updateFilters} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <>
          <GroupsTable groups={data.groups} deleteGroup={deleteGroup} />
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

export default GroupsAdmin;
