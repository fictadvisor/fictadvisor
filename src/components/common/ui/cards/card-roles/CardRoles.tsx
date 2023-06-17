import React from 'react';
import mergeClassNames from 'merge-class-names';

import Tag, { TagColor, TagSize, TagVariant } from '@/components/common/ui/tag';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from './CardRoles.module.scss';

export interface CardRolesProps {
  roles: TeacherRoles[];
  className?: string;
}

const TagText = {
  LABORANT: 'Лаборант',
  LECTURER: 'Лектор',
  PRACTICIAN: 'Практик',
};

const TagColors = {
  LABORANT: TagColor.MINT,
  LECTURER: TagColor.VIOLET,
  PRACTICIAN: TagColor.ORANGE,
};

export const CardRoles: React.FC<CardRolesProps> = ({ roles, className }) => {
  return (
    <div className={mergeClassNames(styles['card-roles'], className)}>
      {roles.map(role => (
        <Tag
          size={TagSize.SMALL}
          text={TagText[role]}
          variant={TagVariant.FILLED}
          color={TagColors[role]}
          key={Math.random()}
        />
      ))}
    </div>
  );
};
