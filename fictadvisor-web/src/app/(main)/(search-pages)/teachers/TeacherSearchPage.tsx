'use client';

import { FC, useMemo } from 'react';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import {
  SEARCH_LIST_QUERY_OPTIONS,
  TeacherInitialValues,
} from '@/app/(main)/(search-pages)/search-form/constants';
import { useSearchFormState } from '@/app/(main)/(search-pages)/search-form/hooks/useSearchFormState';
import SearchForm from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { TeacherSearchList } from '@/app/(main)/(search-pages)/teachers/components/TeacherSearchList';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
  sortOptions,
} from '@/app/(main)/(search-pages)/teachers/constants';
import * as styles from '@/app/(main)/(search-pages)/teachers/TeacherSearchPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

const TeacherSearchPage: FC = () => {
  const { initialValues, values, handleSubmit, restorationKey } =
    useSearchFormState(TeacherInitialValues, {
      sortOptions,
      withTeacherFilters: true,
    });

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['teachers', values],

    queryFn: ({ pageParam }) =>
      TeacherAPI.getAll({
        ...values,
        page: pageParam,
        pageSize: PAGE_SIZE,
      } as QueryAllTeachersDTO),

    initialPageParam: 0,
    getNextPageParam: ({ pagination }) =>
      pagination.page + 1 < pagination.totalPages
        ? pagination.page + 1
        : undefined,
    placeholderData: keepPreviousData,
    ...SEARCH_LIST_QUERY_OPTIONS,
  });

  const teachers = useMemo(
    () => data?.pages.flatMap(page => page.teachers) ?? [],
    [data],
  );

  // Every page the user had loaded comes back from the query cache at once, so
  // the list is already its full height when we put the scroll offset back.
  useScrollRestoration(restorationKey, !isPending);

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        initialValues={initialValues}
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={filterOptions}
        onSubmit={handleSubmit}
      />
      {data && (
        <TeacherSearchList teachers={teachers} isFetching={isFetching} />
      )}
      {isFetching && (
        <Box sx={styles.pageLoader}>
          <Progress />
        </Box>
      )}
      {hasNextPage && !isFetching && (
        <Button
          sx={styles.loadBtn}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={() => void fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
    </Box>
  );
};

export default TeacherSearchPage;
