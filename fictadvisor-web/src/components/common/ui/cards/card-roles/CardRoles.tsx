import { FC } from 'react';
import cn from 'classnames';

import Tag from '@/components/common/ui/tag';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { TeacherRole } from '@/types/teacher';

import styles from './CardRoles.module.scss';

export interface CardRolesProps {
  roles: TeacherRole[];
  className?: string;
}

const TagText: Record<TeacherRole, string> = {
  [TeacherRole.LABORANT]: 'Лабораторні',
  [TeacherRole.LECTURER]: 'Лекції',
  [TeacherRole.PRACTICIAN]: 'Практики',
  [TeacherRole.EXAMINER]: 'Екзамени',
  [TeacherRole.OTHER]: 'Інше',
};

const TagColors: Record<TeacherRole, TagColor> = {
  [TeacherRole.LABORANT]: TagColor.MINT,
  [TeacherRole.LECTURER]: TagColor.INDIGO,
  [TeacherRole.PRACTICIAN]: TagColor.ORANGE,
  [TeacherRole.EXAMINER]: TagColor.VIOLET,
  [TeacherRole.OTHER]: TagColor.PRIMARY,
};

export const CardRoles: FC<CardRolesProps> = ({ roles, className }) => {
  return (
    <div className={cn(styles['card-roles'], className)}>
      {roles.map(role => (
        <Tag
          size={TagSize.SMALL}
          text={TagText[role]}
          color={TagColors[role]}
          key={Math.random()}
        />
      ))}
    </div>
  );
};
