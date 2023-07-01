import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button, {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Loader, { LoaderSize } from '@/components/common/ui/loader/Loader';
import PollTeacherSearchList from '@/components/pages/search-pages/poll-teachers-page/PollTeacherSearchList';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';
import { PollTeachersResponse } from '@/lib/api/poll/types/PollTeachersResponse';
import { showAlert } from '@/redux/reducers/alert.reducer';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import styles from '../SearchPage.module.scss';

const breadcrumbs = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Опитування',
    href: '/poll',
  },
];
const pageSize = 20;

const PollTeacherPage: FC = () => {
  const [curPage, setCurPage] = useState(0);
  const { push, replace } = useRouter();
  const { user, isLoggedIn } = useAuthentication();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(
        showAlert({
          title: 'Для проходження опитування потрібно авторизуватися',
          color: AlertColor.ERROR,
        }),
      );
      void replace('/login?redirect=~poll');
    }
  }, [dispatch, isLoggedIn, push, replace]);

  const { data, isLoading, isFetching } = useQuery<PollTeachersResponse>(
    'pollTeachers',
    () => PollAPI.getUserTeachers(user.id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: user?.id != null,
    },
  );

  useEffect(() => {
    if (!data) return;

    if (!data.hasSelectedInLastSemester) {
      toast.warning(
        'Ти ще не обрав вибіркові на цей семестр!',
        'Обери свої вибіркові в профілі у вкладці "Мої вибіркові".',
      );
    }
  }, [data, toast]);

  return (
    <PageLayout title={'Викладачі'}>
      <div className={styles['layout']}>
        {isLoggedIn && (
          <>
            <Breadcrumbs items={breadcrumbs} className={styles['breadcrumb']} />

            {data && (
              <PollTeacherSearchList data={data} className="poll-teacher" />
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
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default PollTeacherPage;
