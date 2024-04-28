'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryAllQuestionDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { initialValues } from '@/app/admin/questions/common/constants';
import QuestionsAdminSearch from '@/app/admin/questions/search/components/questions-search-page';
import QuestionsTable from '@/app/admin/questions/search/components/questions-search-page/components/questions-table';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

const Page = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<QueryAllQuestionDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, refetch, isLoading } = useQuery(
    ['questions', currPage, params, pageSize],
    () =>
      QuestionAPI.getPageQuestions({
        ...params,
        pageSize,
        page: currPage,
      }),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleChange = (values: QueryAllQuestionDTO) => {
    setParams(prevValues => {
      if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
        setCurrPage(0);
        return values;
      }
      return prevValues;
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrPage(0);
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
        page={currPage}
        rowsPerPage={pageSize}
        onPageChange={(e, page) => setCurrPage(page)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Page;
