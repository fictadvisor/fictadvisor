import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';

import styles from './MobileRequestTable.module.scss';

export interface StudentTableItem {
  imgSrc?: string;
  fullName: string;
  role: string;
  email: string;
  value: string;
}

interface StudentTableProps {
  rows: StudentTableItem[];
}

const MobileRequestTable: React.FC<StudentTableProps> = ({ rows }) => {
  return (
    <div className={styles['table']}>
      {rows.map((row, index) => (
        <div key={index} className={styles['table-container']}>
          <img src={row.imgSrc} alt="avatar" />
          <div className={styles['user-info']}>
            <h6 className={styles['full-name']}>{row.fullName}</h6>
            <h6 className={styles['email']}>{row.email}</h6>
          </div>
          <div className={styles['side-buttons']}>
            <AlertButton
              className={styles['button-left']}
              variant={AlertButtonVariant.SUCCESS}
              endIcon={<CustomCheck />}
            />
            <AlertButton
              className={styles['button-right']}
              variant={AlertButtonVariant.ERROR_OUTLINE}
              startIcon={<XMarkIcon className="icon" />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileRequestTable;
