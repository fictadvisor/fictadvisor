'use client';

import { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';
import {
  PaginatedTeachersResponse,
  TeacherWithRolesAndCathedrasResponse,
} from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';

import { TeacherInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import SearchForm, {
  SearchFormProps,
} from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import { TeacherSearchList } from '@/app/(main)/(search-pages)/teachers/components/TeacherSearchList';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
} from '@/app/(main)/(search-pages)/teachers/constants';
import * as styles from '@/app/(main)/(search-pages)/teachers/TeacherSearchPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Pagination } from '@/types/api';

const TeacherPage: FC = () => {
  const parsedData = JSON.parse(localStorage.getItem('teachersForm') || '{}');
  const initialValues =
    parsedData.length === Object.keys(TeacherInitialValues).length
      ? parsedData
      : TeacherInitialValues;
  const localStorageName = 'teachersForm';
  const [queryObj, setQueryObj] = useState<SearchFormFields>(initialValues);
  const [currPage, setCurrPage] = useState(0);

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(prev => {
      if (prev === query) return prev;
      else {
        setLoadedTeachers([]);
        return { ...prev, ...query };
      }
    });
  }, []);

  const [loadedTeachers, setLoadedTeachers] = useState<
    TeacherWithRolesAndCathedrasResponse[]
  >([]);
  const { data, isLoading, isFetching } = useQuery<PaginatedTeachersResponse>(
    ['lecturers', currPage, queryObj],
    () =>
      TeacherAPI.getAll({
        ...queryObj,
        pageSize: PAGE_SIZE,
        page: currPage,
      } as QueryAllTeacherDTO),
    {
      onSuccess: data => setLoadedTeachers(prev => [...prev, ...data.teachers]),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={filterOptions}
        onSubmit={submitHandler}
        initialValues={initialValues}
        localStorageName={localStorageName}
      />
      {data && (
        <TeacherSearchList
          teachers={loadedTeachers}
          pagination={data.pagination}
          isFetching={isFetching}
        />
      )}
      {isLoading ||
        (isFetching && (
          <Box sx={styles.pageLoader}>
            <Progress />
          </Box>
        ))}
      {!isLoading && (data?.pagination as Pagination).amount >= 20 && (
        <Button
          sx={styles.loadBtn}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={() => setCurrPage(pr => pr + 1)}
        />
      )}
    </Box>
  );
};

export default TeacherPage;
