'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import HeaderUserSearch from '@/app/admin/users/search/components/header-user-search';
import UsersList from '@/app/admin/users/search/components/users-list';
import { UserInitialValues } from '@/app/admin/users/search/constants';
import {
  HeaderUserSearchProps,
  UserSearchFormFields,
} from '@/app/admin/users/search/types';
import LoadPage from '@/components/common/ui/load-page';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';

const Page = () => {
  const [values, setValues] = useState<UserSearchFormFields>(UserInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['users', currPage, pageSize, values],
    queryFn: () =>
      UserAPI.getAll({
        ...values,
        page: currPage,
        pageSize,
      }),
    ...useQueryAdminOptions,
  });

  const submitHandler: HeaderUserSearchProps['onSubmit'] = query =>
    setValues(prev => ({ ...prev, ...query }));

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <UsersList
          currPage={currPage}
          setCurrPage={setCurrPage}
          users={data.data}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default Page;
