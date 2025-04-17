'use client';

import React, { useState } from 'react';
import { QueryAllCommentsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { initialValues } from '@/app/admin/comments/common/constants';
import AdminCommentsSearch from '@/app/admin/comments/search/components/admin-comments-search/AdminCommentsSearch';
import CommentsTable from '@/app/admin/comments/search/components/admin-comments-table';
import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import LoadPage from '@/components/common/ui/load-page';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [values, setValues] = useState<QueryAllCommentsDTO>(initialValues);
  const { displayError } = useToastError();

  const {
    data: commentsData,
    isLoading,
    refetch,
    error: errorComments,
  } = useQuery({
    queryKey: ['comments', currPage, pageSize, values],

    queryFn: () =>
      TeacherApi.getComments({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  const submitHandler = (query: QueryAllCommentsDTO) =>
    setValues(prev => ({ ...prev, ...query }));

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
  };

  if (errorComments) {
    displayError(errorComments);
    throw new Error(`An error has occurred`);
  }

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <AdminCommentsSearch onSubmit={submitHandler} values={values} />
      {isLoading && <LoadPage />}
      {commentsData && (
        <>
          <CommentsTable comments={commentsData.comments} refetch={refetch} />
          <TablePagination
            sx={stylesAdmin.pagination}
            count={commentsData.pagination.totalAmount}
            page={currPage}
            rowsPerPage={pageSize}
            onPageChange={(e, page) => setCurrPage(page)}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </Box>
  );
};

export default Page;
