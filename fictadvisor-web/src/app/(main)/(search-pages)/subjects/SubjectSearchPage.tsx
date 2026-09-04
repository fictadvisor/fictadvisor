'use client';

import { FC, useMemo } from 'react';
import { QueryAllSubjectsDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import {
  SEARCH_LIST_QUERY_OPTIONS,
  SubjectInitialValues,
} from '@/app/(main)/(search-pages)/search-form/constants';
import { useSearchFormState } from '@/app/(main)/(search-pages)/search-form/hooks/useSearchFormState';
import SearchForm from '@/app/(main)/(search-pages)/search-form/SearchForm';
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

const SubjectSearchPage: FC = () => {
  const { initialValues, values, handleSubmit, restorationKey } =
    useSearchFormState(SubjectInitialValues, { sortOptions });

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['subjects', values],

    queryFn: ({ pageParam }) =>
      SubjectsAPI.getAll({
        search: values.search,
        order: values.order,
        sort: values.sort,
        groupId: values.groupId,
        page: pageParam,
        pageSize: PAGE_SIZE,
      } as QueryAllSubjectsDTO),

    initialPageParam: 0,
    getNextPageParam: ({ pagination }) =>
      pagination.page + 1 < pagination.totalPages
        ? pagination.page + 1
        : undefined,
    placeholderData: keepPreviousData,
    ...SEARCH_LIST_QUERY_OPTIONS,
  });

  const subjects = useMemo(
    () => data?.pages.flatMap(page => page.subjects) ?? [],
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
