import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import AdminSubjectSearch from '@/components/pages/admin/admin-subjects/admin-subject-search-page/components/admin-subject-search';
import AdminSubjectTable from '@/components/pages/admin/admin-subjects/admin-subject-search-page/components/admin-subject-table';
import { SubjectInitialValues } from '@/components/pages/search-pages/search-form/constants';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import subjectAPI from '@/lib/api/subject/SubjectAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

import * as styles from './AdminSubjectSearchPage.styles';

const AdminSubjectSearchPage = () => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<SearchFormFields>(SubjectInitialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isSuccess, refetch } = useQuery(
    ['subjects', curPage, pageSize],
    () => subjectAPI.getAll(params, pageSize, curPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => setCount(data.pagination.totalAmount),
      onError: error => displayError(error),
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

  const handleDelete = async (subjectId: string) => {
    try {
      await SubjectAPI.delete(subjectId);
      await refetch();
      toast.success('Предмет успішно видалений', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={styles.page}>
      <AdminSubjectSearch onSubmit={handleSearch} />
      {isSuccess && (
        <AdminSubjectTable
          subjects={data.subjects}
          handleDelete={handleDelete}
        />
      )}
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
