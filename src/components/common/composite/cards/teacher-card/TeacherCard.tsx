import React from 'react';
import mergeClassNames from 'merge-class-names';

import { DivProps } from '@/components/common/composite/cards/Cards';
import styles from '@/components/common/composite/cards/teacher-card/TeacherCard.module.scss';

type TeacherCardProps = {
  name: string;
  rating?: number;
  avatar?: string;
  disabled?: boolean;
} & DivProps;

export const TeacherCard: React.FC<TeacherCardProps> = ({
  rating,
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
        <img
          className={styles['teacher-card-avatar']}
          src={avatar}
          alt="викладач"
        />
        <h4 className={styles['teacher-card-name']}>{name}</h4>
      </div>
    </div>
  );
};
