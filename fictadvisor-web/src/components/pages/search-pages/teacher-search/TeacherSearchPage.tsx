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
import { Teacher } from '@/types/teacher';

import { TeacherInitialValues } from '../search-form/constants';
import SearchForm from '../search-form/SearchForm';

import { TeacherSearchList } from './components/TeacherSearchList';
import * as styles from './TeacherSearchPage.styles';

export const TeacherSearchPage = () => {
  const initialValues = localStorage.getItem('teachersForm')
    ? JSON.parse(localStorage.getItem('teachersForm') || '{}')
    : TeacherInitialValues;
  const localStorageName = 'teachersForm';
  const [queryObj, setQueryObj] = useState<SearchFormFields>(initialValues);
  const [curPage, setCurPage] = useState(0);

  const [reloadTeachers, setReloadTeachers] = useState(true);
  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setReloadTeachers(true);
    setLoadedTeachers([]);
    setQueryObj(prev => ({ ...prev, ...query }));
  }, []);

  const [loadedTeachers, setLoadedTeachers] = useState<Omit<Teacher, 'role'>[]>(
    [],
  );
  const { data, isLoading, refetch, isFetching } =
    useQuery<GetTeachersResponse>(
      'lecturers',
      () => {
        if (reloadTeachers) {
          return TeacherAPI.getAll(queryObj, PAGE_SIZE * (curPage + 1));
        } else {
          setLoadedTeachers([
            ...(loadedTeachers ?? []),
            ...(data ? data.teachers : []),
          ]);
          return TeacherAPI.getPage(queryObj, PAGE_SIZE, curPage + 1);
        }
      },
      { keepPreviousData: true, refetchOnWindowFocus: false },
    );

  const downloadHandler = () => {
    setReloadTeachers(false);
    setCurPage(pr => pr + 1);
  };

  useEffect(() => {
    void refetch();
  }, [queryObj, curPage, refetch, reloadTeachers]);

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
          teachers={[...(loadedTeachers ?? []), ...data.teachers]}
        />
      )}
      {isLoading ||
        (isFetching && (
          <Box sx={styles.pageLoader}>
            <Progress />
          </Box>
        ))}
      <Button
        sx={styles.loadBtn}
        text="Завантажити ще"
        variant={ButtonVariant.FILLED}
        color={ButtonColor.SECONDARY}
        onClick={downloadHandler}
      />{' '}
    </Box>
  );
};

export default TeacherSearchPage;
