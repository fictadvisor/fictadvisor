import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import useAuthentication from '@/hooks/use-authentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

import styles from './MobileRequestTable.module.scss';

export interface RequestTableItem {
  imgSrc?: string;
  fullName: string;
  email: string;
  id: string;
}

interface RequestTableProps {
  rows: RequestTableItem[];
  refetch;
}

const MobileRequestTable: React.FC<RequestTableProps> = ({ rows, refetch }) => {
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
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Нові запити</h4>
        <div className={styles['white']}></div>
      </div>
      <div className={styles['table']}>
        {rows.map((row, index) => (
          <div key={index} className={styles['table-container']}>
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

export default MobileRequestTable;
