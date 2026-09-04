'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import HeaderUserSearch from '@/app/admin/users/search/components/header-user-search';
import UsersList from '@/app/admin/users/search/components/users-list';
import { UserInitialValues } from '@/app/admin/users/search/constants';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';

const Page = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(UserInitialValues, 5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['users', currPage, pageSize, values],
    queryFn: () =>
      UserAPI.getAll({
        ...values,
        page: currPage,
        pageSize,
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
      <HeaderUserSearch onSubmit={updateFilters} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <UsersList
          currPage={currPage}
          setCurrPage={setCurrPage}
          users={data.data}
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
