'use client';

import { FC, useCallback, useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
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
} from '@/app/(main)/(search-pages)/teachers/constants';
import * as styles from '@/app/(main)/(search-pages)/teachers/TeacherSearchPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { Pagination } from '@/types/api';

interface TeacherPageProps {
  initialTeachers: TeacherWithRolesAndCathedrasResponse[];
  pagination: Pagination;
  queryObj: SearchFormFields;
}

const TeacherPage: FC<TeacherPageProps> = ({
  initialTeachers,
  pagination,
  queryObj: initialQueryObj,
}) => {
  const localStorageName = 'teachersForm';
  const [currPage, setCurrPage] = useState(0);
  const [queryObj, setQueryObj] = useState<SearchFormFields>(initialQueryObj);
  const [loadedTeachers, setLoadedTeachers] =
    useState<TeacherWithRolesAndCathedrasResponse[]>(initialTeachers);

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(prev => {
      if (prev === query) return prev;
      else {
        return { ...prev, ...query };
      }
    });
  }, []);

  // const { data, isLoading, isFetching, isSuccess } = useQuery({
  //   queryKey: ['lecturers', currPage, queryObj],

  //   queryFn: () =>
  //     TeacherAPI.getAll({
  //       ...queryObj,
  //       pageSize: PAGE_SIZE,
  //       page: currPage,
  //     } as QueryAllTeacherDTO),

  //   placeholderData: (previousData, previousQuery) => previousData,
  //   refetchOnWindowFocus: false,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setLoadedTeachers(data.teachers);
  //   }
  // }, [data]);

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        initialValues={TeacherInitialValues}
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={filterOptions}
        onSubmit={submitHandler}
        setQueryObj={setQueryObj}
        localStorageName={localStorageName}
      />
      <TeacherSearchList
        teachers={loadedTeachers}
        pagination={pagination}
        isFetching={false}
      />
      {/* {isLoading ||
          (isFetching && (
            <Box sx={styles.pageLoader}>
              <Progress />
            </Box>
          ))} */}
      {pagination.amount >= 20 && (
        <Button
          sx={styles.loadBtn}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={() => setCurrPage(currPage + 1)}
        />
      )}
    </Box>
  );
};

export default TeacherPage;
