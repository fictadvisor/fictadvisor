'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

import { initialValues } from '../common/constants';
import { CommentsAdminSearchFormFields } from '../common/types';

import AdminCommentsSearch from './components/admin-comments-search';
import CommentsTable from './components/admin-comments-table/CommentsTable';

const SeacrhCommentsAdminPage: FC = () => {
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

export default SeacrhCommentsAdminPage;
