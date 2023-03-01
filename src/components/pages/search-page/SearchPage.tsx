import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Loader, { LoaderSize } from '@/components/common/ui/loader/Loader';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import { initialValues } from './search-form/constants';
import { SearchForm } from './search-form/SearchForm';
import { SearchList } from './SerachList';

import styles from './SearchPage.module.scss';

const pageSize = 20;

const SearchPage = () => {
  const [queryObj, setQueryObj] = useState(initialValues);
  const [curPage, setCurPage] = useState(0);

  const submitHandler = useCallback(query => {
    setQueryObj(query);
    setCurPage(0);
  }, []);

  const { data, isLoading, refetch, isFetching } = useQuery<{
    teachers: GetTeacherDTO[];
  }>(
    'lecturers',
    TeacherAPI.getAll.bind(null, queryObj, pageSize * (curPage + 1)),
    { keepPreviousData: true },
  );

  useEffect(() => {
    refetch();
  }, [queryObj, curPage]);

  return (
    <PageLayout description={'Вчителі'} hasFooter={true}>
      <div className={styles['layout']}>
        <SearchForm onSubmit={submitHandler} />

        {data && <SearchList items={data.teachers} />}
        {isLoading ||
          (isFetching && (
            <div className={styles['page-loader']}>
              <Loader size={LoaderSize.LARGEST} />
            </div>
          ))}

        {data?.teachers.length === (curPage + 1) * pageSize && (
          <Button
            text="Завантажити"
            variant={ButtonVariant.FILLED}
            color={ButtonColor.SECONDARY}
            onClick={() => setCurPage(pr => pr + 1)}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default SearchPage;
