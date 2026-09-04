'use client';
import React, { FC, use } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { GrantsInitialValues } from '@/app/admin/roles/[roleId]/grants/common/constants';
import GrantsList from '@/app/admin/roles/[roleId]/grants/search/components/grants-list';
import HeaderGrantsSearch from '@/app/admin/roles/[roleId]/grants/search/components/header-grants-search/HeaderGrantsSearch';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: Promise<{
    roleId: string;
  }>;
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const { roleId } = use(params);

  const {
    filters: queryObj,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(GrantsInitialValues, 5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['allGrantsByRoleId', currPage, pageSize, queryObj, roleId],

    queryFn: () =>
      GrantsAPI.getAllByRoleId(roleId, {
        ...queryObj,
        page: currPage,
        pageSize,
        set: queryObj.set === 'given',
      }),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderGrantsSearch
        onSubmit={updateFilters}
        values={queryObj}
        roleId={roleId}
      />
      {isLoading || !data ? (
        <LoadPage />
      ) : (
        <GrantsList
          currPage={currPage}
          setCurrPage={setCurrPage}
          grants={data.grants}
          pageSize={pageSize}
          setPageSize={changePageSize}
          totalCount={data.pagination.totalAmount}
          roleId={roleId}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminGrantsEdit;
