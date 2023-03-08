import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const { query } = useRouter();
  const error = query.error as string;
  const { isLoading, data } = useQuery(['groups'], () => GroupAPI.getAll(), {
    refetchOnWindowFocus: false,
  });

  const dispatch = useDispatch();
  if (error) {
    dispatch(
      showAlert({
        title: 'Помилка!',
        description: 'Лист для верифікації сплив або неправильний код!',
        color: AlertColor.ERROR,
      }),
    );
  }

  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['register-page']}>
        <div className={styles['register-page__content']}>
          {!isLoading && (
            <>
              <LeftBlock groups={data.groups || []} />
              <hr className={styles['divider']} />
              <RightBlock />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
