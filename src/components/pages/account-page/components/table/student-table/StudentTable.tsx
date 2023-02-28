import React from 'react';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Tag, { TagSize } from '@/components/common/ui/tag';

import styles from './StudentTable.module.scss';
export enum StudentRole {
  CAPTAIN = 'Староста',
  MODERATOR = 'Зам. старости',
  STUDENT = 'Студент',
}
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

const getSettings = (variant: StudentRole, role: string) => {
  const buttonText =
    role === StudentRole.MODERATOR
      ? StudentRole.STUDENT
      : StudentRole.MODERATOR;
  const buttonIcon =
    role === StudentRole.MODERATOR ? (
      <ArrowDownCircleIcon className="icon" />
    ) : (
      <ArrowUpCircleIcon className="icon" />
    );
  const trashButton = (
    <Button
      text={''}
      color={ButtonColor.SECONDARY}
      size={ButtonSize.SMALL}
      startIcon={<TrashIcon className="icon" />}
    />
  );
  if (variant === StudentRole.CAPTAIN && role !== StudentRole.CAPTAIN) {
    return (
      <div className={styles['side-buttons']}>
        <div>
          <Button
            text={buttonText}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            startIcon={buttonIcon}
          />
        </div>
        <div>{trashButton}</div>
      </div>
    );
  }
  if (variant === StudentRole.MODERATOR && !role) {
    return trashButton;
  }
};

const StudentTable: React.FC<StudentTableProps> = ({ variant, rows }) => {
  return (
    <div className={styles['table']}>
      {rows.map((row, index) => (
        <div key={index} className={styles['table-container']}>
          <div className={styles['user-info']}>
            <img src={row.imgSrc} alt="avatar" />
            <div className={styles['full-name']}>{row.fullName}</div>
            <div className={styles['tag-container']}>
              <div className={styles['tag']}>
                {row.role && <Tag text={row.role} size={TagSize.SMALL} />}
              </div>
            </div>
          </div>
          <div className={styles['other-content']}>
            <div className={styles['email']}>{row.email}</div>
            <div className={styles['side-buttons']}>
              {getSettings(variant, row.role)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentTable;
