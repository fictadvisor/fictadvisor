import { FC, ReactNode } from 'react';
import {
  BeakerIcon,
  BookOpenIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';

import Tag from '@/components/common/ui/tag';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { TeacherRole } from '@/types/teacher';

import styles from './CardRoles.module.scss';

export interface CardRolesProps {
  roles: TeacherRole[];
  className?: string;
  isDesktop?: boolean;
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

const TagIcons: Record<TeacherRole, ReactNode> = {
  [TeacherRole.LABORANT]: <BeakerIcon />,
  [TeacherRole.LECTURER]: <BookOpenIcon />,
  [TeacherRole.PRACTICIAN]: <WrenchIcon />,
  [TeacherRole.EXAMINER]: null,
  [TeacherRole.OTHER]: null,
};

export const CardRoles: FC<CardRolesProps> = ({
  roles,
  className,
  isDesktop,
}) => {
  return (
    <div className={cn(styles['card-roles'], className)}>
      {roles.map(role => (
        <Tag
          sx={{
            display: ['EXAMINER', 'OTHER'].includes(role) ? 'none' : 'flex',
          }}
          size={TagSize.SMALL}
          text={isDesktop ? TagText[role] : ''}
          icon={isDesktop ? null : TagIcons[role]}
          color={TagColors[role]}
          key={Math.random()}
        />
      ))}
    </div>
  );
};
