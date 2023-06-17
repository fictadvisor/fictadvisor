import React from 'react';
import mergeClassNames from 'merge-class-names';

import { CardRoles } from '@/components/common/ui/cards/card-roles';
import styles from '@/components/common/ui/cards/subject-teacher-card/SubjectTeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

type SubjectTeacherCardProps = {
  name: string;
  rating?: number;
  roles?: TeacherRoles[];
  avatar?: string;
  disabled?: boolean;
} & DivProps;

export const SubjectTeacherCard: React.FC<SubjectTeacherCardProps> = ({
  name,
  roles,
  avatar,
  disabled,
  ...rest
}) => {
  return (
    <div
      className={mergeClassNames(
        styles['subject-teacher-card'],
        styles['subject-teacher-card-effect'],
        disabled && styles['card-disabled'],
      )}
      {...rest}
    >
      <div className={styles['subject-teacher-card-shift']}>
        <img
          className={styles['subject-teacher-card-avatar']}
          src={avatar}
          alt="викладач"
        />
        <CardRoles
          roles={roles}
          className={styles['subject-teacher-card-roles']}
        />
        <h4 className={styles['subject-teacher-card-name']}>{name}</h4>
      </div>
    </div>
  );
};
