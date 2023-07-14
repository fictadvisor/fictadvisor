import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';

import Alert from '@/components/common/ui/alert-mui';
import { AlertType } from '@/components/common/ui/alert-mui/types';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Checkbox, Dropdown } from '@/components/common/ui/form';
import Progress from '@/components/common/ui/progress-mui';
import { transformGroups } from '@/components/pages/account-page/components/group-tab/components/no-group-block/utils';
import { validationSchema } from '@/components/pages/account-page/components/group-tab/components/no-group-block/validation';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { RequestNewGroupBody } from '@/lib/api/user/types/RequestNewGroupBody';
import UserAPI from '@/lib/api/user/UserAPI';
import { UserGroupState } from '@/types/user';

import styles from './NoGroupBlock.module.scss';

const NoGroupBlock: FC = () => {
  const { user, update } = useAuthentication();
  const { isLoading, data } = useQuery(['groups'], () => GroupAPI.getAll(), {
    refetchOnWindowFocus: false,
  });
  const toast = useToast();

  const handleSubmitGroup = async (data: RequestNewGroupBody) => {
    try {
      await UserAPI.requestNewGroup(data, user.id);
      await update();
    } catch (error) {
      // TODO: refactor this shit
      const errorName = (error as AxiosError<{ error: string }>).response?.data
        .error;
      if (errorName === 'AlreadyRegisteredException') {
        toast.error('В групі вже є староста');
      } else {
        toast.error('Як ти це зробив? :/');
      }
    }
  };

  if (isLoading) return <Progress />;

  if (!data) return null;

  return (
    <div className={styles['content']}>
      {user.group?.state === UserGroupState.PENDING ? (
        <>
          <div className={styles['text-content']}>
            <h4>{user.group.code}</h4>
          </div>
          <div className={styles['alert-desktop-pending']}>
            <Alert title="Ваша заявка ще не прийнята, очікуйте підтвердження" />
          </div>
          <div className={styles['division']}>
            <div className={styles['white']}></div>
            <h4 className={styles['division-text']}>Або виберіть іншу групу</h4>
            <div className={styles['white']}></div>
            <div className={styles['button']}></div>
          </div>
        </>
      ) : (
        <>
          <div className={styles['alert-desktop']}>
            <Alert
              title={'Ваша заявка відхилена'}
              type={AlertType.ERROR}
              description={'Оберіть іншу групу нижче та надішліть новий запит'}
            />
          </div>
          <div className={styles['alert-mobile']}>
            <Alert title={'Ваша заявка відхилена'} type={AlertType.ERROR} />
          </div>
        </>
      )}
      <Formik
        initialValues={{ groupId: '', isCaptain: false }}
        onSubmit={handleSubmitGroup}
        validateOnMount
        validateOnChange
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Dropdown
              options={transformGroups(data.groups)}
              label="Група"
              name="groupId"
              placeholder="вибери зі списку"
            />
            <Checkbox label="Староста" name="isCaptain" />
            <Button
              text="Надіслати запит"
              type="submit"
              size={ButtonSize.SMALL}
              disabled={!isValid}
              className={styles['button-group']}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default NoGroupBlock;
