'use client';
import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { GrantsInitialValues } from '@/app/admin/roles/[roleId]/grants/common/constants';
import { GrantsSearchFormFields } from '@/app/admin/roles/[roleId]/grants/common/types';
import GrantsList from '@/app/admin/roles/[roleId]/grants/search/components/grants-list';
import HeaderGrantsSearch, {
  HeaderGrantsSearchProps,
} from '@/app/admin/roles/[roleId]/grants/search/components/header-grants-search/HeaderGrantsSearch';
import LoadPage from '@/components/common/ui/load-page';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const [queryObj, setQueryObj] =
    useState<GrantsSearchFormFields>(GrantsInitialValues);
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { displayError } = useToastError();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [
      'allGrantsByRoleId',
      currPage,
      pageSize,
      queryObj,
      params.roleId,
    ],

    queryFn: () =>
      GrantsAPI.getAllByRoleId(params.roleId, {
        ...queryObj,
        page: currPage,
        pageSize,
        set: queryObj.set === 'given',
      }),

    ...useQueryAdminOptions,
  });

  const submitHandler: HeaderGrantsSearchProps['onSubmit'] = query =>
    setQueryObj(prev => ({ ...prev, ...query }));

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.wrapper}>
      <HeaderGrantsSearch onSubmit={submitHandler} roleId={params.roleId} />
      {isLoading || !data ? (
        <LoadPage />
      ) : (
        <GrantsList
          currPage={currPage}
          setCurrPage={setCurrPage}
          grants={data.grants}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          roleId={params.roleId}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminGrantsEdit;
