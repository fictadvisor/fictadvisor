'use client';

import React, { useState } from 'react';
import { QueryAllQuestionsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

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
  const [values, setValues] = useState<QueryAllQuestionsDTO>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['questions', currPage, values, pageSize],

    queryFn: () =>
      QuestionAPI.getPageQuestions({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...useQueryAdminOptions,
  });

  const handleChange = (values: QueryAllQuestionsDTO) => {
    setValues(prevValues => {
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
      await refetch();
    } catch (e) {
      displayError(e);
    }
  };

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <QuestionsAdminSearch onSubmit={handleChange} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Page;
