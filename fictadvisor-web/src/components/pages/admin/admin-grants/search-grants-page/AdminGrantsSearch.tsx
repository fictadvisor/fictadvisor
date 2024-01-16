'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import GrantsAPI from '@/lib/api/grants/GrantsAPI';

import { GrantsInitialValues } from '../common/constants/GrantsInitialValues';
import { GrantsSearchFormFields } from '../common/types/GrantsSearchFormFields';

import GrantsList from './components/grants-list';
import HeaderGrantsSearch from './components/header-grants-search';
import { HeaderGrantsSearchProps } from './components/header-grants-search/HeaderGrantsSearch';
import * as styles from './AdminGrantsSearch.styles';

const AdminGrantsSearch: FC<{ roleId: string }> = ({ roleId }) => {
  const [queryObj, setQueryObj] =
    useState<GrantsSearchFormFields>(GrantsInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, refetch } = useQuery(
    ['allGrantsByRoleId', curPage, pageSize, queryObj],
    async () =>
      await GrantsAPI.getAllByRoleId(roleId, queryObj, curPage, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  const submitHandler: HeaderGrantsSearchProps['onSubmit'] = query => {
    setQueryObj(prev => ({ ...prev, ...query }));
  };
  return (
    <Box sx={styles.wrapper}>
      <HeaderGrantsSearch onSubmit={submitHandler} roleId={roleId} />
      {isSuccess && (
        <GrantsList
          curPage={curPage}
          setCurPage={setCurPage}
          grants={data.grants}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
          roleId={roleId}
        />
      )}
    </Box>
  );
};

export default AdminGrantsSearch;
