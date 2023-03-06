import React, { FC, useRef } from 'react';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import {
  IconButton,
  IconButtonColor,
} from '@/components/common/ui/icon-button/IconButton';
import { StudentTableItem } from '@/components/pages/account-page/components/group-tab/components/table/mobile-student-table/MobileStudentTable';
import { StudentRole } from '@/components/pages/account-page/components/group-tab/components/table/student-table/StudentTable';
import dataMapper from '@/components/pages/account-page/components/group-tab/components/table/student-table/utils';
import useAuthentication from '@/hooks/use-authentication';
import useOutsideClick from '@/hooks/use-outside-click';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

import styles from './MobileStudentTableButtons.module.scss';

export interface MobileStudentTableButtonsProps {
  value: number;
  currentValue: number;
  onChange: (value) => void;
  student: StudentTableItem;
  variant?: string;
  refetch;
}

const MobileStudentTableButtons: FC<MobileStudentTableButtonsProps> = ({
  value,
  currentValue,
  onChange,
  student,
  refetch,
}) => {
  const { user } = useAuthentication();
  const handleDelete = async () => {
    await GroupAPI.removeStudent(user.group.id, student.id);
    await refetch();
  };

  const handleChangeRole = async () => {
    await GroupAPI.switchStudentRole(user.group.id, student.id, {
      roleName:
        student.role === StudentRole.MODERATOR ? 'STUDENT' : 'MODERATOR',
    });
    await refetch();
  };

  const buttonIcon = student.role ? (
    <ArrowDownCircleIcon className="icon" />
  ) : (
    <ArrowUpCircleIcon className="icon" />
  );

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => onChange(-1));

  const buttonName = student.role ? StudentRole.STUDENT : StudentRole.MODERATOR;
  return (
    <>
      {dataMapper[user.group.role] === StudentRole.CAPTAIN ? (
        <>
          {student.role !== StudentRole.CAPTAIN ? (
            <div className={styles['button']}>
              <IconButton
                icon={<EllipsisVerticalIcon className={'icon'} />}
                color={IconButtonColor.TRANSPARENT}
                onClick={() => onChange(value)}
              />
              {currentValue === value && (
                <div className={styles['dropdown-content']} ref={wrapperRef}>
                  <Button
                    className={styles['dropdown-button']}
                    text={buttonName}
                    variant={ButtonVariant.TEXT}
                    startIcon={buttonIcon}
                    onClick={handleChangeRole}
                  />
                  <Button
                    className={styles['dropdown-button']}
                    text={'Видалити'}
                    variant={ButtonVariant.TEXT}
                    startIcon={<TrashIcon className={'icon'} />}
                    onClick={handleDelete}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles['button']}>
              <IconButton
                icon={<EllipsisVerticalIcon className={'icon'} />}
                color={IconButtonColor.TRANSPARENT}
                disabled={true}
                className={styles['disabled-button']}
              />
            </div>
          )}
        </>
      ) : (
        dataMapper[user.group.role] === StudentRole.MODERATOR && (
          <>
            {!student.role ? (
              <div className={styles['button']}>
                <IconButton
                  icon={<EllipsisVerticalIcon className={'icon'} />}
                  color={IconButtonColor.TRANSPARENT}
                  onClick={() => onChange(value)}
                />
                {currentValue === value && (
                  <div className={styles['moderator-dropdown-content']}>
                    <Button
                      className={styles['moderator-dropdown-button']}
                      text={'Видалити'}
                      variant={ButtonVariant.TEXT}
                      startIcon={<TrashIcon className={'icon'} />}
                      onClick={handleDelete}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles['button']}>
                <IconButton
                  icon={<EllipsisVerticalIcon className={'icon'} />}
                  color={IconButtonColor.TRANSPARENT}
                  disabled={true}
                  className={styles['disabled-button']}
                />
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default MobileStudentTableButtons;
