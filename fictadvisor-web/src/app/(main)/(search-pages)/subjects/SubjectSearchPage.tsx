'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { QueryAllSubjectsDTO } from '@fictadvisor/utils/requests';
import { PaginatedSubjectsResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  SEARCH_LIST_QUERY_OPTIONS,
  SubjectInitialValues,
} from '@/app/(main)/(search-pages)/search-form/constants';
import {
  hasSameResultSet,
  useLoadedPages,
} from '@/app/(main)/(search-pages)/search-form/hooks/useLoadedPages';
import { useSearchFormState } from '@/app/(main)/(search-pages)/search-form/hooks/useSearchFormState';
import SearchForm from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import { SubjectSearchList } from '@/app/(main)/(search-pages)/subjects/components/SubjectSearchList';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
  sortOptions,
} from '@/app/(main)/(search-pages)/subjects/constants';
import * as styles from '@/app/(main)/(search-pages)/subjects/SubjectSearchPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';

const getQueryKey = (values: SearchFormFields) => ['subjects', values];

const countSubjects = (data: InfiniteData<PaginatedSubjectsResponse>) =>
  data.pages.reduce((total, page) => total + page.subjects.length, 0);

const SubjectSearchPage: FC = () => {
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
        InfiniteData<PaginatedSubjectsResponse>
      >(getQueryKey(next));
      if (!cached) return;

      const cachedSubjects = countSubjects(cached);
      const isTruncated =
        cachedSubjects <
        cached.pages[cached.pages.length - 1].pagination.totalAmount;
      if (isTruncated && cachedSubjects < loadedPagesRef.current * PAGE_SIZE) {
        queryClient.removeQueries({ queryKey: getQueryKey(next), exact: true });
      }
    },
    [queryClient, resetLoadedPages, loadedPagesRef],
  );

  const { initialValues, values, handleSubmit, restorationKey } =
    useSearchFormState(
      SubjectInitialValues,
      { sortOptions },
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
      SubjectsAPI.getAll({
        search: values.search,
        order: values.order,
        sort: values.sort,
        groupId: values.groupId,
        ...pageParam,
      } as QueryAllSubjectsDTO),

    // A reordered list starts as one page holding everything the user had open.
    initialPageParam: { page: 0, pageSize: PAGE_SIZE * loadedPagesRef.current },
    getNextPageParam: ({ pagination }, pages) => {
      const loaded = pages.reduce(
        (total, page) => total + page.subjects.length,
        0,
      );
      return loaded < pagination.totalAmount
        ? { page: Math.ceil(loaded / PAGE_SIZE), pageSize: PAGE_SIZE }
        : undefined;
    },
    placeholderData: keepPreviousData,
    ...SEARCH_LIST_QUERY_OPTIONS,
  });

  const subjects = useMemo(
    () => data?.pages.flatMap(page => page.subjects) ?? [],
    [data],
  );

  useEffect(() => {
    if (isPlaceholderData || !subjects.length) return;
    rememberLoadedItems(subjects.length);
  }, [subjects.length, isPlaceholderData, rememberLoadedItems]);

  // Every page the user had loaded comes back from the query cache at once, so
  // the list is already its full height when we put the scroll offset back.
  useScrollRestoration(restorationKey, !isPending);

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        initialValues={initialValues}
        searchPlaceholder="Оберіть предмет"
        filterDropDownOptions={filterOptions}
        onSubmit={handleSubmit}
        isSubject={true}
      />
      {data && (
        <SubjectSearchList subjects={subjects} isFetching={isFetching} />
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

export default SubjectSearchPage;
