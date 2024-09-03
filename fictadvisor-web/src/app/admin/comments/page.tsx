'use client';

import React, { useState } from 'react';
import { QueryAllCommentsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { initialValues } from '@/app/admin/comments/common/constants';
import AdminCommentsSearch from '@/app/admin/comments/search/components/admin-comments-search/AdminCommentsSearch';
import CommentsTable from '@/app/admin/comments/search/components/admin-comments-table';
import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import LoadPage from '@/components/common/ui/load-page';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [queryObj, setQueryObj] = useState<QueryAllCommentsDTO>(initialValues);
  const qc = useQueryClient();

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['comments', currPage, pageSize, queryObj],

    queryFn: async () =>
      await TeacherApi.getComments({
        ...queryObj,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  const { data: dates, isLoading: isLoadingDates } = useQuery({
    queryKey: ['dates', false],
    queryFn: async () => await DatesAPI.getDates(false),
    ...useQueryAdminOptions,
  });

  if (isLoading || isLoadingDates) return <LoadPage />;

  if (!commentsData || !dates) throw new Error(`An error has occurred`);

  const submitHandler = (query: QueryAllCommentsDTO) =>
    setQueryObj(prev => ({ ...prev, ...query }));

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
  };

  const refetch = async () => {
    await qc.refetchQueries({
      queryKey: ['comments', currPage, pageSize, queryObj],
    });
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <AdminCommentsSearch onSubmit={submitHandler} dates={dates} />
      <CommentsTable comments={commentsData.comments} refetch={refetch} />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={commentsData.pagination.totalAmount}
        page={currPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurrPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Page;
