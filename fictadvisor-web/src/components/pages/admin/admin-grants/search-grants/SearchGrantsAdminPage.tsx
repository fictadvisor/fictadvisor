'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

import { GrantsInitialValues } from '../common/constants';
import { GrantsSearchFormFields } from '../common/types';

import GrantsList from './components/grants-list';
import HeaderGrantsSearch from './components/header-grants-search';
import { HeaderGrantsSearchProps } from './components/header-grants-search/HeaderGrantsSearch';

const SearchGrantsAdminPage: FC<{ roleId: string }> = ({ roleId }) => {
  const [queryObj, setQueryObj] =
    useState<GrantsSearchFormFields>(GrantsInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ['allGrantsByRoleId', curPage, pageSize, queryObj, roleId],
    () => GrantsAPI.getAllByRoleId(roleId, queryObj, curPage, pageSize),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const submitHandler: HeaderGrantsSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderGrantsSearch onSubmit={submitHandler} roleId={roleId} />
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
    </Box>
  );
};

export default SearchGrantsAdminPage;
