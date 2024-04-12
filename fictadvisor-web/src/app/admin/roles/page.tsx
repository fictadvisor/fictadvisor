'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { RolesInitialValues } from '@/app/admin/roles/common/constants';
import {
  HeaderRolesSearchProps,
  RolesSearchFormFields,
} from '@/app/admin/roles/common/types';
import HeaderRolesSearch from '@/app/admin/roles/search/components/header-roles-search';
import RolesList from '@/app/admin/roles/search/components/roles-list';
import LoadPage from '@/components/common/ui/load-page';
import RoleAPI from '@/lib/api/role/RoleAPI';

const Page = () => {
  const [queryObj, setQueryObj] =
    useState<RolesSearchFormFields>(RolesInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, refetch, isLoading } = useQuery(
    ['roles', curPage, pageSize, queryObj],
    async () => await RoleAPI.getAll(curPage, queryObj, pageSize),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess) throw new Error('error loading data');

  const submitHandler: HeaderRolesSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderRolesSearch onSubmit={submitHandler} />
      <RolesList
        curPage={curPage}
        setCurPage={setCurPage}
        roles={data.data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
        refetch={refetch}
      />
    </Box>
  );
};

export default Page;
