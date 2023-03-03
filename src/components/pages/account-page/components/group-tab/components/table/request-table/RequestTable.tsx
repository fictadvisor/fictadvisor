import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import CustomDivider from '@/components/pages/account-page/components/divider';
import useAuthentication from '@/hooks/use-authentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

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
  const handleApprove = async (userId: string) => {
    await GroupAPI.verifyStudent(user.group.id, userId, { state: 'APPROVED' });
    await refetch();
  };

  const handleDecline = async (userId: string) => {
    await GroupAPI.verifyStudent(user.group.id, userId, { state: 'DECLINED' });
    await refetch();
  };

  return (
    <>
      <CustomDivider text="Нові запити" />
      <div className={styles['table']}>
        {rows.map((row, index) => (
          <div key={index} className={styles['table-container']}>
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
