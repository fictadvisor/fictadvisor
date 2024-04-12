'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { GrantsInitialValues } from '@/app/admin/roles/[roleId]/grants/common/constants';
import { GrantsSearchFormFields } from '@/app/admin/roles/[roleId]/grants/common/types';
import GrantsList from '@/app/admin/roles/[roleId]/grants/search/components/grants-list';
import HeaderGrantsSearch, {
  HeaderGrantsSearchProps,
} from '@/app/admin/roles/[roleId]/grants/search/components/header-grants-search/HeaderGrantsSearch';
import LoadPage from '@/components/common/ui/load-page';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const [queryObj, setQueryObj] =
    useState<GrantsSearchFormFields>(GrantsInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, refetch, isLoading } = useQuery(
    ['allGrantsByRoleId', curPage, pageSize, queryObj, params.roleId],
    () => GrantsAPI.getAllByRoleId(params.roleId, queryObj, curPage, pageSize),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const submitHandler: HeaderGrantsSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderGrantsSearch onSubmit={submitHandler} roleId={params.roleId} />
      <GrantsList
        curPage={curPage}
        setCurPage={setCurPage}
        grants={data.grants}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={data.pagination.totalAmount}
        refetch={refetch}
        roleId={params.roleId}
      />
    </Box>
  );
};

export default AdminGrantsEdit;
