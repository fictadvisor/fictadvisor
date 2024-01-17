'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { GetAllResponse } from '@/lib/api/group/types/GetAllResponse';
import StudentAPI from '@/lib/api/student/StudentAPI';

import { StudentSearchFormFields } from '../common/types/StudentSearch';

import HeaderUserSearch from './components/header-student-search';
import { HeaderStudentSearchProps } from './components/header-student-search/HeaderStudentSearch';
import StudentsList from './components/students-list';
import { StudentInitialValues } from './constants/StudentInitialValues';
import * as styles from './AdminStudentSearch.styles';

export interface AdminStudentSearchPageProps {
  dataGroups: GetAllResponse | null;
}

const AdminStudentSearch: FC<AdminStudentSearchPageProps> = ({
  dataGroups,
}) => {
  const [queryObj, setQueryObj] =
    useState<StudentSearchFormFields>(StudentInitialValues);
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isSuccess, refetch } = useQuery(
    ['students', curPage, pageSize, queryObj],
    async () => await StudentAPI.getAll(curPage, queryObj, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  const submitHandler: HeaderStudentSearchProps['onSubmit'] = query => {
    setQueryObj(prev => ({ ...prev, ...query }));
  };

  return (
    <Box sx={styles.wrapper}>
      <HeaderUserSearch
        onSubmit={submitHandler}
        groups={dataGroups?.groups || []}
      />
      {isSuccess && (
        <StudentsList
          curPage={curPage}
          setCurPage={setCurPage}
          students={data.students}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data.pagination.totalAmount}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminStudentSearch;
