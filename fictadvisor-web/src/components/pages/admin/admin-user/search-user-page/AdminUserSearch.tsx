'use client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import UserAPI from '@/lib/api/user/UserAPI';

import HeaderUserSearch from './components/header-user-search';
import UsersList from './components/users-list';
import { UserInitialValues } from './constants/UserInitialValues';
import {
  HeaderUserSearchProps,
  UserSearchFormFields,
} from './types/HeaderUserSearch';
import * as styles from './AdminUserSearch.styles';

const AdminUserSearch = () => {
  const [queryObj, setQueryObj] =
    useState<UserSearchFormFields>(UserInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, refetch } = useQuery(
    ['users', curPage, pageSize, queryObj],
    async () => await UserAPI.getAll(curPage, queryObj, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  const submitHandler: HeaderUserSearchProps['onSubmit'] = query => {
    setQueryObj(prev => ({ ...prev, ...query }));
  };

  return (
    <Box sx={styles.wrapper}>
      <HeaderUserSearch onSubmit={submitHandler} />
      {isSuccess && (
        <UsersList
          curPage={curPage}
          setCurPage={setCurPage}
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

export default AdminUserSearch;
