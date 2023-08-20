import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button, {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Progress from '@/components/common/ui/progress';
import PollTeacherSearchList from '@/components/pages/search-pages/poll-teachers-page/components/PollTeacherSearchList';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';
import { PollTeachersResponse } from '@/lib/api/poll/types/PollTeachersResponse';

import styles from './PollTeacherPage.module.scss';

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
const PAGE_SIZE = 20;

const PollTeacherPage: FC = () => {
  const [curPage, setCurPage] = useState(0);
  const { push, replace } = useRouter();
  const { user, isLoggedIn } = useAuthentication();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Для проходження опитування потрібно авторизуватися');
      void replace('/login?redirect=~poll');
    }
  }, [isLoggedIn, push, replace]);

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
  }, [data]);

  return (
    <div className={styles['layout']}>
      {isLoggedIn && (
        <>
          <Breadcrumbs
            items={breadcrumbs}
            sx={{ margin: '16px 0px 16px 0px' }} //TODO move inline styles when refactor
          />

          {data && (
            <PollTeacherSearchList data={data} className="poll-teacher" />
          )}
          {isLoading ||
            (isFetching && (
              <div className={styles['page-loader']}>
                <Progress />
              </div>
            ))}

          {data?.teachers.length === (curPage + 1) * PAGE_SIZE && (
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
  );
};

export default PollTeacherPage;
