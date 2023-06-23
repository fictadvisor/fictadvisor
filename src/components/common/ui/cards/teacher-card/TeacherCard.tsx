import React from 'react';
import mergeClassNames from 'merge-class-names';
import Image from 'next/image';

import styles from '@/components/common/ui/cards/teacher-card/TeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';

type TeacherCardProps = {
  name: string;
  avatar?: string;
  disabled?: boolean;
} & DivProps;

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  avatar,
  disabled,
  ...rest
}) => {
  return (
    <div
      className={mergeClassNames(
        styles['teacher-card'],
        styles['teacher-card-effect'],
        disabled && styles['card-disabled'],
      )}
      {...rest}
    >
      <div className={styles['teacher-card-shift']}>
        <Image
          className={styles['teacher-card-avatar']}
          src={avatar}
          alt="викладач"
          width={64}
          height={64}
        />
        <h4 className={styles['teacher-card-name']}>{name}</h4>
      </div>
    </div>
  );
};
