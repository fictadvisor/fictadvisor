import React from 'react';
import { FC } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

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
        <div className={styles['dropdown-content']}></div>
      )}
    </div>
  );
};

export default MobileStudentTableButtons;
