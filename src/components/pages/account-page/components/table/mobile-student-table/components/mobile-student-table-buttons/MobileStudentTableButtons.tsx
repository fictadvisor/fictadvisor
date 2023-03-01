import React, { FC } from 'react';
import {
  ArrowUpCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import {
  IconButton,
  IconButtonColor,
} from '@/components/common/ui/icon-button/IconButton';

import styles from './MobileStudentTableButtons.module.scss';

export interface MobileStudentTableButtonsProps {
  value: number;
  currentValue: number;
  onChange: (value) => void;
}

const MobileStudentTableButtons: FC<MobileStudentTableButtonsProps> = ({
  value,
  currentValue,
  onChange,
}) => {
  return (
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
            text={'Зам староста'}
            variant={ButtonVariant.TEXT}
            startIcon={<ArrowUpCircleIcon className="icon" />}
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
  );
};

export default MobileStudentTableButtons;
