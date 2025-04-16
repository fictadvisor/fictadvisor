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
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import RoleAPI from '@/lib/api/role/RoleAPI';

const Page = () => {
  const [values, setValues] = useState<QueryAllRolesDTO>(RolesInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['roles', currPage, pageSize, values],

    queryFn: async () =>
      await RoleAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  const submitHandler: HeaderRolesSearchProps['onSubmit'] = query =>
    setValues(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderRolesSearch onSubmit={submitHandler} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <RolesList
          currPage={currPage}
          setCurrPage={setCurrPage}
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

export default Page;
