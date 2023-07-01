import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button, {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Loader, { LoaderSize } from '@/components/common/ui/loader/Loader';
import { SearchFormProps } from '@/components/pages/search-pages/search-form/SearchForm';
import { TeacherSearchFormFields } from '@/components/pages/search-pages/search-form/types';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';

import { TeacherInitialValues } from '../search-form/constants';
import { SearchForm } from '../search-form/SearchForm';

import { TeacherSearchList } from './TeacherSearchList';

import styles from '../SearchPage.module.scss';

const breadcrumbs = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Викладачі',
    href: '/teachers',
  },
];
const pageSize = 20;

export const TeacherSearchPage = () => {
  const initialValues = localStorage.getItem('teachersForm')
    ? JSON.parse(localStorage.getItem('teachersForm') || '{}')
    : TeacherInitialValues;
  const localStorageName = 'teachersForm';
  const [queryObj, setQueryObj] =
    useState<TeacherSearchFormFields>(initialValues);
  const [curPage, setCurPage] = useState(0);
  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(query as TeacherSearchFormFields);
    setCurPage(0);
  }, []);

  const { data, isLoading, refetch, isFetching } =
    useQuery<GetTeachersResponse>(
      'lecturers',
      () => TeacherAPI.getAll(queryObj, pageSize * (curPage + 1)),
      { keepPreviousData: true, refetchOnWindowFocus: false },
    );

  useEffect(() => {
    void refetch();
  }, [queryObj, curPage, refetch]);

  return (
    <div className={styles['layout']}>
      <Breadcrumbs items={breadcrumbs} className={styles['breadcrumb']} />

      <SearchForm
        searchPlaceholder="Оберіть викладача"
        filterDropDownOptions={[
          { value: 'firstName', label: 'Іменем' },
          { value: 'lastName', label: 'Прізвищем' },
        ]}
        onSubmit={submitHandler}
        initialValues={initialValues}
        localStorageName={localStorageName}
      />

      {data && (
        <TeacherSearchList teachers={data.teachers} className="teacher" />
      )}

      {isLoading ||
        (isFetching && (
          <div className={styles['page-loader']}>
            <Loader size={LoaderSize.SMALLEST} />
          </div>
        ))}

      {data?.teachers.length === (curPage + 1) * pageSize && (
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

export default TeacherSearchPage;
