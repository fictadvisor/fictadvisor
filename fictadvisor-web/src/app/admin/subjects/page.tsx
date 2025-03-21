'use client';
import React, { useState } from 'react';
import { QueryAllSubjectsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { SubjectInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import AdminSubjectTable from '@/app/admin/subjects/search/components/admin-subject-table';
import SubjectsSearchHeader from '@/app/admin/subjects/search/components/subject-search-header';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import subjectAPI from '@/lib/api/subject/SubjectAPI';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

const AdminSubjectSearch = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(0);
  const [params, setParams] = useState<SearchFormFields>(SubjectInitialValues);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['subjects', currPage, pageSize, params],

    queryFn: () =>
      subjectAPI.getAll({
        ...params,
        pageSize,
        page: currPage,
      } as QueryAllSubjectsDTO),

    ...useQueryAdminOptions,
  });

  if (isLoading) return <LoadPage />;

  if (!data) throw new Error('error loading data');

  const handleSearch = (values: SearchFormFields) => {
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
        page={currPage}
        count={data.pagination.totalAmount}
        onPageChange={(e, page) => setCurrPage(page)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={stylesAdmin.pagination}
      />
    </Box>
  );
};

export default AdminSubjectSearch;
