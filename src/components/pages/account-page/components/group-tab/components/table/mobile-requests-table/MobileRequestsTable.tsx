import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import CustomDivider from '@/components/pages/account-page/components/divider';
import useAuthentication from '@/hooks/use-authentication';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';
import { UserGroupState } from '@/types/user';

import { RequestsTableProps } from '../types';

import styles from './MobileRequestsTable.module.scss';

const MobileRequestsTable: FC<RequestsTableProps> = ({ rows, refetch }) => {
  const { user } = useAuthentication();
  const dispatch = useDispatch();
  const handleApprove = async (userId: string) => {
    try {
      // TODO: remove as and refactor props
      await GroupAPI.verifyStudent(user.group?.id as string, userId, {
        state: UserGroupState.APPROVED,
      });
      await refetch();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Щось пішло не так, спробуй пізніше!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };

  const handleDecline = async (userId: string) => {
    try {
      // TODO: remove as and refactor props
      await GroupAPI.verifyStudent(user.group?.id as string, userId, {
        state: UserGroupState.DECLINED,
      });
      await refetch();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Щось пішло не так, спробуй пізніше!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };
  return (
    <>
      <CustomDivider text="Нові запити" />
      <div className={styles['table']}>
        {rows.map((row, index) => (
          <div
            key={index}
            className={
              styles[
                rows.length === 1
                  ? 'table-container-one'
                  : index === rows.length - 1
                  ? 'table-container-end'
                  : index === 0
                  ? 'table-container-start'
                  : 'table-container'
              ]
            }
          >
            <img className={styles['img']} src={row.imgSrc} alt="avatar" />
            <div className={styles['user-info']}>
              <h6 className={styles['full-name']}>{row.fullName}</h6>
              <h6 className={styles['email']}>{row.email}</h6>
            </div>
            <div className={styles['side-buttons']}>
              <AlertButton
                className={styles['button-left']}
                variant={AlertButtonVariant.SUCCESS}
                endIcon={<CustomCheck />}
                onClick={() => handleApprove(row.id)}
              />
              <AlertButton
                className={styles['button-right']}
                variant={AlertButtonVariant.ERROR_OUTLINE}
                startIcon={<XMarkIcon className="icon" />}
                onClick={() => handleDecline(row.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MobileRequestsTable;
