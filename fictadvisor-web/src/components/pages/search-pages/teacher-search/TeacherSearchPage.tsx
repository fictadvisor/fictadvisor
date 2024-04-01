'use client';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui/Button';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import { SearchFormProps } from '@/components/pages/search-pages/search-form/SearchForm';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
} from '@/components/pages/search-pages/teacher-search/constants';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';
import { Pagination } from '@/types/api';
import { Teacher } from '@/types/teacher';

import { TeacherInitialValues } from '../search-form/constants';
import SearchForm from '../search-form/SearchForm';

import { TeacherSearchList } from './components/TeacherSearchList';
import * as styles from './TeacherSearchPage.styles';

export const TeacherSearchPage = () => {
  const parsedData = JSON.parse(localStorage.getItem('teachersForm') || '{}');
  const initialValues =
    parsedData.length === Object.keys(TeacherInitialValues).length
      ? parsedData
      : TeacherInitialValues;
  const localStorageName = 'teachersForm';
  const [queryObj, setQueryObj] = useState<SearchFormFields>(initialValues);
  const [curPage, setCurPage] = useState(0);

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(prev => {
      if (prev === query) return prev;
      else {
        setLoadedTeachers([]);
        return { ...prev, ...query };
      }
    });
  }, []);

  const [loadedTeachers, setLoadedTeachers] = useState<Omit<Teacher, 'role'>[]>(
    [],
  );
  const { data, isLoading, isFetching } = useQuery<GetTeachersResponse>(
    ['lecturers', curPage, queryObj],
    () => TeacherAPI.getAdminAll(queryObj, PAGE_SIZE, curPage),
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
      {(data as GetTeachersResponse) && (
        <TeacherSearchList teachers={loadedTeachers} />
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
          onClick={() => setCurPage(pr => pr + 1)}
        />
      )}
    </Box>
  );
};

export default TeacherSearchPage;
