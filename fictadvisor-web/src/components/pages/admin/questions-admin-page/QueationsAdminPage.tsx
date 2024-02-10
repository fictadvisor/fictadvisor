'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';
import { isAxiosError } from 'axios';

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
  const toast = useToastError();
  const { data, refetch } = useQuery(
    [curPage, 'questions', pageSize],
    () => QuestionAPI.getPageQuestions(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
        console.log(data);
      },
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error.response?.data.message);
        }
      },
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
    refetch();
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurPage(0);
  };

  return (
    <Box sx={{ p: '20px 16px 0 16px' }}>
      <QuestionsAdminSearch onSubmit={handleChange} />
      <QuestionsTable questions={data?.questions} />
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

export default QuestionsAdminPage;
