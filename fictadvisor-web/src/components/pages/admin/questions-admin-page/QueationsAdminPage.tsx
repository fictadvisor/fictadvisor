'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

import QuestionsTable from './components/questions-search-page/components/questions-table/QuestionsTable';
import QuestionsAdminSearch from './components/questions-search-page/QuestionsSearchPage';
import { initialValues } from './constants';
import * as styles from './QuestionsAdminPage.styles';
import { QuestionSearchFormFields } from './types';

const QuestionsAdminPage: FC = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<QuestionSearchFormFields>(initialValues);
  const { displayError } = useToastError();
  const toast = useToast();
  const { data, isSuccess, refetch } = useQuery(
    ['questions', curPage, params, pageSize],
    () => QuestionAPI.getPageQuestions(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => setCount(data?.pagination?.totalAmount || 0),
      onError: error => displayError(error),
    },
  );

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
      {isSuccess && (
        <>
          <QuestionsTable
            questions={data.questions}
            deleteQuestion={deleteQuestion}
          />
          <TablePagination
            sx={styles.pagination}
            count={count}
            page={curPage}
            rowsPerPage={pageSize}
            onPageChange={(e, page) => setCurPage(page)}
            onRowsPerPageChange={e => handleRowsPerPageChange(e)}
          />
        </>
      )}
    </Box>
  );
};

export default QuestionsAdminPage;
