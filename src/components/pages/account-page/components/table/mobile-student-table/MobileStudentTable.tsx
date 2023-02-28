import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import { CaptainIcon } from '@/components/common/custom-svg/CaptainIcon';
import { ModeratorIcon } from '@/components/common/custom-svg/ModeratorIcon';
import Button, { ButtonVariant } from '@/components/common/ui/button';
import Tag, { TagSize } from '@/components/common/ui/tag';
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';

import styles from './MobileStudentTable.module.scss';

export interface StudentTableItem {
  imgSrc?: string;
  fullName: string;
  role: string;
  email: string;
  value: string;
}

interface StudentTableProps {
  rows: StudentTableItem[];
  variant: StudentRole;
}

const MobileStudentTable: React.FC<StudentTableProps> = ({ variant, rows }) => {
  return (
    <div className={styles['table']}>
      {rows.map((row, index) => (
        <div key={index} className={styles['table-container']}>
          <img src={row.imgSrc} alt="avatar" />
          <div className={styles['user-info']}>
            <h6 className={styles['full-name']}>{row.fullName}</h6>
            <h6 className={styles['email']}>{row.email}</h6>
          </div>
          <div className={styles['tag']}>
            {row.role && (
              <Tag
                size={TagSize.SMALL}
                icon={
                  row.role === StudentRole.CAPTAIN ? (
                    <CaptainIcon />
                  ) : (
                    <ModeratorIcon />
                  )
                }
              />
            )}
          </div>
          <div className={styles['button']}>
            <Button
              text={''}
              variant={ButtonVariant.TEXT}
              startIcon={<EllipsisVerticalIcon className={'icon'} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileStudentTable;
