'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

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
import UserAPI from '@/lib/api/user/UserAPI';

const Page = () => {
  const [queryObj, setQueryObj] =
    useState<UserSearchFormFields>(UserInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ['users', currPage, pageSize, queryObj],
    async () =>
      await UserAPI.getAll({
        ...queryObj,
        page: currPage,
        pageSize,
      }),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const submitHandler: HeaderUserSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} />
      <UsersList
        currPage={currPage}
        setCurrPage={setCurrPage}
        users={data.data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
        refetch={refetch}
      />
    </Box>
  );
};

export default Page;
