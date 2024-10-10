'use client';

import { FC, useCallback, useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';

import SearchForm from '@/app/(main)/(search-pages)/search-form/SearchForm';
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
import { TeacherInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import { SearchFormFields } from '../search-form/types';
import { useQueryParams } from '@/hooks/use-query-params/useQueryParams';

interface TeacherPageProps {
  pagination: Pagination;
  teachers: TeacherWithRolesAndCathedrasResponse[];
}

const TeacherPage: FC<TeacherPageProps> = ({ teachers, pagination }) => {
  const { updateQueryParams } = useQueryParams();

  const submitHandler = useCallback(
    (values: Partial<SearchFormFields>) => {},
    [],
  );

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={filterOptions}
        initialValues={TeacherInitialValues}
      />
      {/* <TeacherSearchList
        teachers={teachers}
        pagination={pagination}
        isFetching={false}
      /> */}
      {pagination.amount >= 20 && (
        <Button
          sx={styles.loadBtn}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={() => {
            updateQueryParams({ page: (pagination.page + 1).toString() });
          }}
        />
      )}
    </Box>
  );
};

export default TeacherPage;
