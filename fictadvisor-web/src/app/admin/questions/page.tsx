'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { initialValues } from '@/app/admin/questions/common/constants';
import { QuestionSearchFormFields } from '@/app/admin/questions/common/types';
import QuestionsAdminSearch from '@/app/admin/questions/search/components/questions-search-page';
import QuestionsTable from '@/app/admin/questions/search/components/questions-search-page/components/questions-table';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<QuestionSearchFormFields>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, refetch, isLoading } = useQuery(
    ['questions', curPage, params, pageSize],
    () => QuestionAPI.getPageQuestions(params, pageSize, curPage),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleChange = (values: QuestionSearchFormFields) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurPage(0);
        return values;
      }
      return prevValues;
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  const deleteQuestion = async (id: string) => {
    try {
      await QuestionAPI.deleteQuestion(id);
      toast.success('Питання успішно видалено', '', 4000);
      refetch();
    } catch (e) {
      displayError(e);
    }
  };
  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <QuestionsAdminSearch onSubmit={handleChange} />
      <QuestionsTable
        questions={data.questions}
        deleteQuestion={deleteQuestion}
      />
      <TablePagination
        sx={stylesAdmin.pagination}
        count={data.pagination.totalAmount}
        page={curPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Page;
