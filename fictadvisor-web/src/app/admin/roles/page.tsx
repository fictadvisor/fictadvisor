'use client';

import React, { useState } from 'react';
import { QueryAllRolesDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { RolesInitialValues } from '@/app/admin/roles/common/constants';
import { HeaderRolesSearchProps } from '@/app/admin/roles/common/types';
import HeaderRolesSearch from '@/app/admin/roles/search/components/header-roles-search';
import RolesList from '@/app/admin/roles/search/components/roles-list';
import LoadPage from '@/components/common/ui/load-page';
import RoleAPI from '@/lib/api/role/RoleAPI';

const Page = () => {
  const [queryObj, setQueryObj] =
    useState<QueryAllRolesDTO>(RolesInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['roles', currPage, pageSize, queryObj],

    queryFn: async () =>
      await RoleAPI.getAll({
        ...queryObj,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  if (isLoading) return <LoadPage />;

  if (!isSuccess) throw new Error('error loading data');

  const submitHandler: HeaderRolesSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderRolesSearch onSubmit={submitHandler} />
      <RolesList
        currPage={currPage}
        setCurrPage={setCurrPage}
        roles={data.data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
      />
    </Box>
  );
};

export default Page;
