import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import { CaptainIcon } from '@/components/common/custom-svg/CaptainIcon';
import { ModeratorIcon } from '@/components/common/custom-svg/ModeratorIcon';
import {
  IconButton,
  IconButtonShape,
} from '@/components/common/ui/icon-button/IconButton';
import Tag, { TagSize } from '@/components/common/ui/tag';
import CustomDivider from '@/components/pages/account-page/components/divider';
import MobileStudentTableButtons from '@/components/pages/account-page/components/group-tab/components/table/mobile-student-table/components/mobile-student-table-buttons';
import { StudentRole } from '@/components/pages/account-page/components/group-tab/components/table/student-table/StudentTable';

import styles from './MobileStudentTable.module.scss';

export interface StudentTableItem {
  imgSrc?: string;
  fullName: string;
  role: string;
  email: string;
  id: string;
}

interface StudentTableProps {
  rows: StudentTableItem[];
  variant: StudentRole;
  refetch;
}

const MobileStudentTable: React.FC<StudentTableProps> = ({
  variant,
  rows,
  refetch,
}) => {
  const [openedIndex, setOpenedIndex] = useState(-1);
  return (
    <>
      {variant && (
        <CustomDivider text="Студенти">
          <div className={styles['button']}>
            <IconButton
              icon={<PlusIcon className={'icon'} />}
              shape={IconButtonShape.SQUARE}
            />
          </div>
        </CustomDivider>
      )}
      <div className={styles['table']}>
        {rows.map((row, index) => (
          <div key={index} className={styles['table-container']}>
            <img className={styles['img']} src={row.imgSrc} alt="avatar" />
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
            <MobileStudentTableButtons
              value={index}
              currentValue={openedIndex}
              onChange={setOpenedIndex}
              variant={variant}
              student={row}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MobileStudentTable;
