'use client';
import React, { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import CommentsAdminSearch from '@/components/pages/admin/admin-comments/components/admin-comments-search';
import CommentsTable from '@/components/pages/admin/admin-comments/components/admin-comments-table';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherApi from '@/lib/api/teacher/TeacherAPI';

import { initialValues } from './components/admin-comments-search/constants/CommentsInitialValues';
import { CommentsAdminSearchFormFields } from './components/admin-comments-search/types/AdminCommentsSearch';
import * as styles from './CommentsAdminPage.styles';

const CommentsAdminPage: FC = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [queryObj, setQueryObj] =
    useState<CommentsAdminSearchFormFields>(initialValues);
  const toast = useToastError();
  const { data, isLoading, refetch } = useQuery(
    ['comments', curPage, pageSize, queryObj],
    async () => await TeacherApi.getComments(curPage, queryObj, pageSize),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => toast.displayError(error),
    },
  );

  const submitHandler = useCallback((query: CommentsAdminSearchFormFields) => {
    setQueryObj(prev => ({ ...prev, ...query }));
  }, []);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <CommentsAdminSearch onSubmit={submitHandler} />
      <CommentsTable
        comments={data?.comments}
        isLoading={isLoading}
        count={pageSize}
        refetch={refetch}
      />
      <TablePagination
        sx={styles.pagination}
        count={count}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
      />
    </Box>
  );
};

export default CommentsAdminPage;
