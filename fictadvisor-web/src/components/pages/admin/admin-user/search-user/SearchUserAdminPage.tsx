'use client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import UserAPI from '@/lib/api/user/UserAPI';

import HeaderUserSearch from './components/header-user-search';
import UsersList from './components/users-list';
import { UserInitialValues } from './constants';
import { HeaderUserSearchProps, UserSearchFormFields } from './types';

const AdminUserSearch = () => {
  const [queryObj, setQueryObj] =
    useState<UserSearchFormFields>(UserInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ['users', curPage, pageSize, queryObj],
    async () => await UserAPI.getAll(curPage, queryObj, pageSize),
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
        curPage={curPage}
        setCurPage={setCurPage}
        users={data.data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
        refetch={refetch}
      />
    </Box>
  );
};

export default AdminUserSearch;
