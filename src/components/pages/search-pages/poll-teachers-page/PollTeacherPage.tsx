import { FC, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button, {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Loader, { LoaderSize } from '@/components/common/ui/loader/Loader';
import PollTeacherSearchList from '@/components/pages/search-pages/poll-teachers-page/PollTeacherSearchList';
import useAuthentication from '@/hooks/use-authentication';
import { PollTeachersDTO } from '@/lib/api/poll/dto/PollTeachersDTO';
import { PollAPI } from '@/lib/api/poll/PollAPI';

import PageLayout from '../../../common/layout/page-layout/PageLayout';
import { TeacherInitialValues } from '../search-form/constants';
import { SearchForm } from '../search-form/SearchForm';

import styles from '../SearchPage.module.scss';

const breadcrumbs = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Вчителі',
    href: '/teachers',
  },
];
const pageSize = 20;

const PollTeacherPage: FC = () => {
  const [queryObj, setQueryObj] = useState(TeacherInitialValues);
  const [curPage, setCurPage] = useState(0);
  const { push } = useRouter();
  const { user, isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn) {
      void push('/login?redirect=~poll');
    }
  }, [isLoggedIn, push]);

  const submitHandler = useCallback(query => {
    setQueryObj(query);
    setCurPage(0);
  }, []);

  const { data, isLoading, refetch, isFetching } = useQuery<PollTeachersDTO>(
    'pollTeachers',
    () => PollAPI.getUserTeachers(user.id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: user?.id != null,
    },
  );

  return (
    <PageLayout title={'Вчителі'}>
      <div className={styles['layout']}>
        {isLoggedIn && (
          <>
            <Breadcrumbs items={breadcrumbs} className={styles['breadcrumb']} />

            {data && <PollTeacherSearchList data={data} className="teacher" />}
            {isLoading ||
              (isFetching && (
                <div className={styles['page-loader']}>
                  <Loader size={LoaderSize.SMALLEST} />
                </div>
              ))}

            {data?.teachers.length === (curPage + 1) * pageSize && (
              <Button
                className={styles['load-btn']}
                text="Завантажити"
                variant={ButtonVariant.FILLED}
                color={ButtonColor.SECONDARY}
                onClick={() => setCurPage(pr => pr + 1)}
              />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default PollTeacherPage;
