'use client';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import RoleAPI from '@/lib/api/role/RoleAPI';

import { RolesInitialValues } from '../common/constants/RolesInitialValues';
import {
  HeaderRolesSearchProps,
  RolesSearchFormFields,
} from '../common/types/HeaderRolesSearch';

import HeaderRolesSearch from './components/header-roles-search';
import RolesList from './components/roles-list';
import * as styles from './AdminRolesSearch.styles';

const AdminRolesSearch = () => {
  const [queryObj, setQueryObj] =
    useState<RolesSearchFormFields>(RolesInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, refetch } = useQuery(
    ['roles', curPage, pageSize, queryObj],
    async () => await RoleAPI.getAll(curPage, queryObj, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  const submitHandler: HeaderRolesSearchProps['onSubmit'] = query => {
    setQueryObj(prev => ({ ...prev, ...query }));
  };

  return (
    <Box sx={styles.wrapper}>
      <HeaderRolesSearch onSubmit={submitHandler} />
      {isSuccess && (
        <RolesList
          curPage={curPage}
          setCurPage={setCurPage}
          roles={data.data}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminRolesSearch;
