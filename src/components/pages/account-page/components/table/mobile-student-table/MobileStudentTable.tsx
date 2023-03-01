import React, { useState } from 'react';

import { CaptainIcon } from '@/components/common/custom-svg/CaptainIcon';
import { ModeratorIcon } from '@/components/common/custom-svg/ModeratorIcon';
import Tag, { TagSize, TagVariant } from '@/components/common/ui/tag';
import MobileStudentTableButtons from '@/components/pages/account-page/components/table/mobile-student-table/components/mobile-student-table-buttons';
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
  const [openedIndex, setOpenedIndex] = useState(-1);
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
                variant={TagVariant.DARKER}
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
          <MobileStudentTableButtons
            value={index}
            currentValue={openedIndex}
            role={row.role}
            onChange={setOpenedIndex}
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
};

export default MobileStudentTable;
