'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import { initialValues } from '@/app/admin/comments/common/constants';
import { CommentsAdminSearchFormFields } from '@/app/admin/comments/common/types';
import AdminCommentsSearch from '@/app/admin/comments/search/components/admin-comments-search/AdminCommentsSearch';
import CommentsTable from '@/app/admin/comments/search/components/admin-comments-table';
import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import LoadPage from '@/components/common/ui/load-page';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [queryObj, setQueryObj] =
    useState<CommentsAdminSearchFormFields>(initialValues);

  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useQuery(
    ['comments', curPage, pageSize, queryObj],
    async () => await TeacherApi.getComments(curPage, queryObj, pageSize),
    useQueryAdminOptions,
  );

  const { data: dates, isLoading: isLoadingDates } = useQuery(
    ['dates', false],
    async () => await DatesAPI.getDates(false),
    useQueryAdminOptions,
  );

  if (isLoading || isLoadingDates) return <LoadPage />;

  if (!commentsData || !dates) throw new Error(`An error has occurred`);

  const submitHandler = (query: CommentsAdminSearchFormFields) =>
    setQueryObj(prev => ({ ...prev, ...query }));

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <AdminCommentsSearch onSubmit={submitHandler} dates={dates} />
      <CommentsTable comments={commentsData.comments} refetch={refetch} />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={commentsData.pagination.totalAmount}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Page;
