'use client';

import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { initialValues } from '@/app/admin/questions/common/constants';
import QuestionsAdminSearch from '@/app/admin/questions/search/components/questions-search-page';
import QuestionsTable from '@/app/admin/questions/search/components/questions-search-page/components/questions-table';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';

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
  const toast = useToast();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['questions', currPage, values, pageSize],

    queryFn: () =>
      QuestionAPI.getPageQuestions({
        ...values,
        pageSize,
        page: currPage,
      }),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

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
      <QuestionsAdminSearch onSubmit={updateFilters} values={values} />
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
            onRowsPerPageChange={e => changePageSize(Number(e.target.value))}
          />
        </>
      )}
    </Box>
  );
};

export default Page;
