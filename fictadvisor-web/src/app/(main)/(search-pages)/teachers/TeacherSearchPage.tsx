'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';
import { PaginatedTeachersResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  SEARCH_LIST_QUERY_OPTIONS,
  TeacherInitialValues,
} from '@/app/(main)/(search-pages)/search-form/constants';
import {
  hasSameResultSet,
  useLoadedPages,
} from '@/app/(main)/(search-pages)/search-form/hooks/useLoadedPages';
import { useSearchFormState } from '@/app/(main)/(search-pages)/search-form/hooks/useSearchFormState';
import SearchForm from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
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

const getQueryKey = (values: SearchFormFields) => ['teachers', values];

const countTeachers = (data: InfiniteData<PaginatedTeachersResponse>) =>
  data.pages.reduce((total, page) => total + page.teachers.length, 0);

const TeacherSearchPage: FC = () => {
  const queryClient = useQueryClient();
  const { loadedPagesRef, resetLoadedPages, rememberLoadedItems } =
    useLoadedPages(PAGE_SIZE);

  const handleValuesChange = useCallback(
    (next: SearchFormFields, prev: SearchFormFields) => {
      if (!hasSameResultSet(prev, next)) {
        resetLoadedPages();
        return;
      }

      // Reordering has to open with everything the user already has. An earlier,
      // shorter visit to that sorting is still cached, and react-query would
      // serve it as is - which is exactly the list silently shrinking back to
      // one page. Drop it so the first page below covers the whole extent.
      const cached = queryClient.getQueryData<
        InfiniteData<PaginatedTeachersResponse>
      >(getQueryKey(next));
      if (!cached) return;

      const cachedTeachers = countTeachers(cached);
      const isTruncated =
        cachedTeachers <
        cached.pages[cached.pages.length - 1].pagination.totalAmount;
      if (isTruncated && cachedTeachers < loadedPagesRef.current * PAGE_SIZE) {
        queryClient.removeQueries({ queryKey: getQueryKey(next), exact: true });
      }
    },
    [queryClient, resetLoadedPages, loadedPagesRef],
  );

  const { initialValues, values, handleSubmit, restorationKey } =
    useSearchFormState(
      TeacherInitialValues,
      { sortOptions, withTeacherFilters: true },
      handleValuesChange,
    );

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    isPlaceholderData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: getQueryKey(values),

    queryFn: ({ pageParam }) =>
      TeacherAPI.getAll({ ...values, ...pageParam } as QueryAllTeachersDTO),

    // A reordered list starts as one page holding everything the user had open.
    initialPageParam: { page: 0, pageSize: PAGE_SIZE * loadedPagesRef.current },
    getNextPageParam: ({ pagination }, pages) => {
      const loaded = pages.reduce(
        (total, page) => total + page.teachers.length,
        0,
      );
      return loaded < pagination.totalAmount
        ? { page: Math.ceil(loaded / PAGE_SIZE), pageSize: PAGE_SIZE }
        : undefined;
    },
    placeholderData: keepPreviousData,
    ...SEARCH_LIST_QUERY_OPTIONS,
  });

  const teachers = useMemo(
    () => data?.pages.flatMap(page => page.teachers) ?? [],
    [data],
  );

  useEffect(() => {
    if (isPlaceholderData || !teachers.length) return;
    rememberLoadedItems(teachers.length);
  }, [teachers.length, isPlaceholderData, rememberLoadedItems]);

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
