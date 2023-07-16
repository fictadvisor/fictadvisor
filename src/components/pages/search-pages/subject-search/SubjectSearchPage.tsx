import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button, {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Progress from '@/components/common/ui/progress-mui';
import { SearchFormProps } from '@/components/pages/search-pages/search-form/SearchForm';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
} from '@/components/pages/search-pages/subject-search/constants';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';
import { GetListOfSubjectsResponse } from '@/lib/api/subject/types/GetListOfSubjectsResponse';

import { SubjectInitialValues } from '../search-form/constants';
import SearchForm from '../search-form/SearchForm';

import { SubjectSearchList } from './SubjectSearchList';

import styles from '../SearchPage.module.scss';

const SubjectSearchPage = () => {
  const [queryObj, setQueryObj] =
    useState<SearchFormFields>(SubjectInitialValues);
  const [curPage, setCurPage] = useState(0);

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(prev => ({ ...prev, ...query }));
    setCurPage(0);
  }, []);

  const { data, isLoading, refetch, isFetching } =
    useQuery<GetListOfSubjectsResponse>(
      'subjects',
      () => SubjectsAPI.getAll(queryObj, PAGE_SIZE * (curPage + 1)),
      { keepPreviousData: true, refetchOnWindowFocus: false },
    );

  useEffect(() => {
    void refetch();
  }, [queryObj, curPage, refetch]);

  return (
    <div className={styles['layout']}>
      {/*TODO move inline styles when refactor*/}
      <Breadcrumbs items={breadcrumbs} sx={{ margin: '16px 0px 16px 0px' }} />
      <SearchForm
        searchPlaceholder="Оберіть предмет"
        filterDropDownOptions={filterOptions}
        onSubmit={submitHandler}
        initialValues={SubjectInitialValues}
      />
      {data && <SubjectSearchList subjects={data.subjects} />}
      {isLoading ||
        (isFetching && (
          <div className={styles['page-loader']}>
            <Progress />
          </div>
        ))}
      {data?.subjects?.length === (curPage + 1) * PAGE_SIZE && (
        <Button
          className={styles['load-btn']}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={() => setCurPage(pr => pr + 1)}
        />
      )}
    </div>
  );
};

export default SubjectSearchPage;
