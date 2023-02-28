import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import RegisterTelegramButton from '@/components/pages/register-page/components/register-telegram-button';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { setGroups } from '@/redux/reducers/group-reducer/group.reducer';
import { SetGroupsAction } from '@/redux/reducers/group-reducer/group.types';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import RegisterForm from './components/register-form';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { telegram } = router.query;

  const { isFetched, data, isSuccess } = useQuery(
    ['groups'],
    () => GroupAPI.getAll(),
    {
      retry: true,
    },
  );

  if (isSuccess) {
    dispatch(setGroups(data as SetGroupsAction));
  }
  if (isFetched) {
    return (
      <PageLayout
        description={'Сторінка для авторизації'}
        hasFooter={false}
        hasHeader={false}
      >
        <div className={styles['login-page']}>
          <div className={styles['login-page__content']}>
            <h3 className={styles['register-header']}>З поверненням!</h3>
            {telegram != 'true' && <RegisterTelegramButton />}
            <RegisterForm />
          </div>
        </div>
      </PageLayout>
    );
  }
};

export default RegisterPage;
