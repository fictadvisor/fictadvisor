'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { RolesInitialValues } from '@/app/admin/roles/common/constants';
import HeaderRolesSearch from '@/app/admin/roles/search/components/header-roles-search';
import RolesList from '@/app/admin/roles/search/components/roles-list';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import RoleAPI from '@/lib/api/role/RoleAPI';

const Page = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(RolesInitialValues, 5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['roles', currPage, pageSize, values],

    queryFn: async () =>
      await RoleAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
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
      <HeaderRolesSearch onSubmit={updateFilters} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <RolesList
          currPage={currPage}
          setCurrPage={setCurrPage}
          roles={data.data}
          pageSize={pageSize}
          setPageSize={changePageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default Page;
