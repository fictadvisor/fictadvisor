'use client';
import React from 'react';
import { QueryAllSubjectsDTO } from '@fictadvisor/utils/requests';
import { Box, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { SubjectInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import { adminListQueryOptions } from '@/app/admin/common/constants';
import { useAdminListState } from '@/app/admin/common/hooks/useAdminListState';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import AdminSubjectTable from '@/app/admin/subjects/search/components/admin-subject-table';
import SubjectsSearchHeader from '@/app/admin/subjects/search/components/subject-search-header';
import LoadPage from '@/components/common/ui/load-page';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

const AdminSubjectSearch = () => {
  const {
    filters: values,
    updateFilters,
    page: currPage,
    setPage: setCurrPage,
    pageSize,
    changePageSize,
    restorationKey,
  } = useAdminListState(SubjectInitialValues, 10);
  const { displayError } = useToastError();
  const toast = useToast();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['subjects', currPage, pageSize, values],

    queryFn: () =>
      SubjectAPI.getAll({
        ...values,
        pageSize,
        page: currPage,
      } as QueryAllSubjectsDTO),

    ...adminListQueryOptions,
  });

  useScrollRestoration(restorationKey, !!data);

  const handleDelete = async (subjectId: string) => {
    try {
      await SubjectAPI.delete(subjectId);
      await refetch();
      toast.success('Предмет успішно видалений', '', 4000);
    } catch (e) {
      displayError(e);
    }
  };

  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={{ padding: '16px' }}>
      <SubjectsSearchHeader onSubmit={updateFilters} values={values} />
      {isLoading && <LoadPage />}
      {data && (
        <>
          <AdminSubjectTable
            subjects={data.subjects}
            handleDelete={handleDelete}
          />
          <TablePagination
            page={currPage}
            count={data.pagination.totalAmount}
            onPageChange={(e, page) => setCurrPage(page)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={e => changePageSize(Number(e.target.value))}
            sx={stylesAdmin.pagination}
          />
        </>
      )}
    </Box>
  );
};

export default AdminSubjectSearch;
