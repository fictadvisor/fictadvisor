'use client';

import { FC, useState } from 'react';
import { Box } from '@mui/material';

import { TeacherInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
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

interface TeacherPageProps {
  pagination: Pagination;
}

const TeacherPage: FC<TeacherPageProps> = ({ pagination }) => {
  const localStorageName = 'teachersForm';
  const [currPage, setCurrPage] = useState(0);

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        initialValues={TeacherInitialValues}
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={filterOptions}
        onSubmit={submitHandler}
        localStorageName={localStorageName}
      />
      <TeacherSearchList
        teachers={loadedTeachers}
        pagination={pagination}
        isFetching={false}
      />
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
