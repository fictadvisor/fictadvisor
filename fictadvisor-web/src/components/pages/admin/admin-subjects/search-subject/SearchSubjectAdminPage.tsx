import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, TablePagination } from '@mui/material';

import LoadPage from '@/components/common/ui/load-page';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import { SubjectInitialValues } from '@/components/pages/search-pages/search-form/constants';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import subjectAPI from '@/lib/api/subject/SubjectAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

import AdminSubjectTable from './components/admin-subject-table';
import SubjectsSearchHeader from './components/subject-search-header';

const SearchSubjectAdminPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [params, setParams] = useState<SearchFormFields>(SubjectInitialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, refetch, isLoading } = useQuery(
    ['subjects', curPage, pageSize, params],
    () => subjectAPI.getAll(params, pageSize, curPage),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleSearch = (values: SearchFormFields) => {
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
    <Box sx={{ padding: '16px' }}>
      <SubjectsSearchHeader onSubmit={handleSearch} />
      <AdminSubjectTable subjects={data.subjects} handleDelete={handleDelete} />
      <TablePagination
        page={curPage}
        count={data.pagination.totalAmount}
        onPageChange={(e, page) => setCurPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={stylesAdmin.pagination}
      />
    </Box>
  );
};

export default SearchSubjectAdminPage;
