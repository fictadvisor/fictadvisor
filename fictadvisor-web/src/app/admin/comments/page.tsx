'use client';

import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { initialValues } from '@/app/admin/comments/common/constants';
import AdminCommentsSearch from '@/app/admin/comments/search/components/admin-comments-search/AdminCommentsSearch';
import CommentsTable from '@/app/admin/comments/search/components/admin-comments-table';
import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

const Page = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(initialValues, 10);
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

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!commentsData);

  if (errorComments) {
    displayError(errorComments);
    throw new Error(`An error has occurred`);
  }

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <AdminCommentsSearch onSubmit={updateFilters} values={values} />
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
            onRowsPerPageChange={e => changePageSize(Number(e.target.value))}
          />
        </>
      )}
    </Box>
  );
};

export default Page;
