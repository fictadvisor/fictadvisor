import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import Tag, { TagSize } from '@/components/common/ui/tag';

import styles from './RequestTable.module.scss';

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

const RequestTable: React.FC<StudentTableProps> = ({ rows }) => {
  return (
    <div className={styles['table']}>
      {rows.map((row, index) => (
        <div key={index} className={styles['table-container']}>
          <div className={styles['user-info']}>
            <img src={row.imgSrc} alt="avatar" />
            <div className={styles['full-name']}>{row.fullName}</div>
            <div className={styles['tag']}>
              {row.role && <Tag text={row.role} size={TagSize.SMALL} />}
            </div>
          </div>
          <div className={styles['other-content']}>
            <div className={styles['email']}>{row.email}</div>
            <div className={styles['side-buttons']}>
              <AlertButton
                text={'Прийняти'}
                variant={AlertButtonVariant.SUCCESS}
                endIcon={<CustomCheck />}
              />
              <AlertButton
                variant={AlertButtonVariant.ERROR_OUTLINE}
                startIcon={<XMarkIcon className="icon" />}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestTable;
