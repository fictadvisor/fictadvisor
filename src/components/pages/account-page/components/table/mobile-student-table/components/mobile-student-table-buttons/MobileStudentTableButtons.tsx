import React, { FC } from 'react';
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
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';

import styles from './MobileStudentTableButtons.module.scss';

export interface MobileStudentTableButtonsProps {
  value: number;
  currentValue: number;
  onChange: (value) => void;
  role: string;
  variant?: string;
}

const MobileStudentTableButtons: FC<MobileStudentTableButtonsProps> = ({
  value,
  currentValue,
  onChange,
  role,
  variant,
}) => {
  const buttonIcon = role ? (
    <ArrowDownCircleIcon className="icon" />
  ) : (
    <ArrowUpCircleIcon className="icon" />
  );
  const buttonName = role ? StudentRole.STUDENT : StudentRole.MODERATOR;
  return (
    <>
      {variant === StudentRole.CAPTAIN ? (
        <>
          {role !== StudentRole.CAPTAIN ? (
            <div className={styles['button']}>
              <IconButton
                icon={<EllipsisVerticalIcon className={'icon'} />}
                color={IconButtonColor.TRANSPARENT}
                onClick={() => onChange(value)}
              />
              {currentValue === value && (
                <div className={styles['dropdown-content']}>
                  <Button
                    className={styles['dropdown-button']}
                    text={buttonName}
                    variant={ButtonVariant.TEXT}
                    startIcon={buttonIcon}
                  />
                  <Button
                    className={styles['dropdown-button']}
                    text={'Видалити'}
                    variant={ButtonVariant.TEXT}
                    startIcon={<TrashIcon className={'icon'} />}
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
        <>
          {!role ? (
            <>
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
                    />
                  </div>
                )}
              </div>
            </>
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
      )}
    </>
  );
};

export default MobileStudentTableButtons;
