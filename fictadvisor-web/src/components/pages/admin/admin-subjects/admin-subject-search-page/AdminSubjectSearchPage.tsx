import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';
import { isAxiosError } from 'axios';

import AdminSubjectSearch from '@/components/pages/admin/admin-subjects/admin-subject-search-page/components/admin-subject-search';
import AdminSubjectTable from '@/components/pages/admin/admin-subjects/admin-subject-search-page/components/admin-subject-table';
import { SubjectInitialValues } from '@/components/pages/search-pages/search-form/constants';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import subjectAPI from '@/lib/api/subject/SubjectAPI';

import * as styles from './AdminSubjectSearchPage.styles';

const AdminSubjectSearchPage = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<SearchFormFields>(SubjectInitialValues);
  const toast = useToastError();
  const { data, isLoading, refetch } = useQuery(
    [curPage, 'subjects', pageSize],
    () => subjectAPI.getAll(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCount(data?.pagination?.totalAmount || 0);
      },
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error);
        }
      },
    },
  );

  const handleSearch = (values: SearchFormFields) => {
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
    <Box sx={styles.page}>
      <AdminSubjectSearch onSubmit={handleSearch} />
      <AdminSubjectTable
        subjects={data?.subjects}
        isLoading={isLoading}
        refetch={refetch}
      />
      <TablePagination
        page={curPage}
        count={count}
        onPageChange={(e, page) => setCurPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => handleRowsPerPageChange(e)}
        sx={styles.pagination}
      />
    </Box>
  );
};

export default AdminSubjectSearchPage;
