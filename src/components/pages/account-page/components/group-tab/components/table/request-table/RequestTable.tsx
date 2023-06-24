import React from 'react';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import CustomDivider from '@/components/pages/account-page/components/divider';
import useAuthentication from '@/hooks/use-authentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from './RequestTable.module.scss';

export interface RequestTableItem {
  imgSrc?: string;
  fullName: string;
  email: string;
  id: string;
}

interface StudentTableProps {
  rows: RequestTableItem[];
  refetch;
}

const RequestTable: React.FC<StudentTableProps> = ({ rows, refetch }) => {
  const { user } = useAuthentication();
  const dispatch = useDispatch();
  const handleApprove = async (userId: string) => {
    try {
      await GroupAPI.verifyStudent(user.group.id, userId, {
        state: 'APPROVED',
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
      await GroupAPI.verifyStudent(user.group.id, userId, {
        state: 'DECLINED',
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
            <div className={styles['user-info']}>
              <img className={styles['img']} src={row.imgSrc} alt="avatar" />
              <div className={styles['full-name']}>{row.fullName}</div>
            </div>
            <div className={styles['other-content']}>
              <div className={styles['email']}>{row.email}</div>
              <div className={styles['side-buttons']}>
                <AlertButton
                  text={'Прийняти'}
                  variant={AlertButtonVariant.SUCCESS}
                  endIcon={<CustomCheck />}
                  onClick={() => handleApprove(row.id)}
                />
                <AlertButton
                  variant={AlertButtonVariant.ERROR_OUTLINE}
                  startIcon={<XMarkIcon className="icon" />}
                  onClick={() => handleDecline(row.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RequestTable;
