import React from 'react';
import mergeClassNames from 'merge-class-names';

import Tag from '@/components/common/ui/tag-mui';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from './CardRoles.module.scss';

export interface CardRolesProps {
  roles: TeacherRoles[];
  className?: string;
}

export const CardRoles: React.FC<CardRolesProps> = ({ roles, className }) => {
  return (
    <div className={mergeClassNames(styles['card-roles'], className)}>
      {roles.includes(TeacherRoles.LECTURER) && (
        <Tag color="indigo" size="small" text="Лектор" />
      )}

      {roles.includes(TeacherRoles.PRACTICIAN) && (
        <Tag color="orange" size="small" text="Практик" />
      )}

      {roles.includes(TeacherRoles.LABORANT) && (
        <Tag color="mint" size="small" text="Лаборант" />
      )}
    </div>
  );
};
