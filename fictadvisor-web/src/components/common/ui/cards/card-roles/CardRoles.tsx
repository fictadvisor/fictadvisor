import { FC, ReactNode } from 'react';
import {
  BeakerIcon,
  BookOpenIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import { Typography, useMediaQuery } from '@mui/material';
import cn from 'classnames';

import Tag from '@/components/common/ui/tag';
import {
  TagColor,
  TagSize,
  TagVariant,
} from '@/components/common/ui/tag/types';
import theme from '@/styles/theme';
import { TeacherCathedra, TeacherRole } from '@/types/teacher';

import * as stylesMui from './CardRoles.styles';

import styles from './CardRoles.module.scss';

export interface CardRolesProps {
  roles: TeacherRole[];
  className?: string;
  isTeachersPage?: boolean;
  isPersonalPage?: boolean;
  cathedras: TeacherCathedra[];
}

export const TagText: Record<TeacherRole, string> = {
  [TeacherRole.LABORANT]: 'Лабораторні',
  [TeacherRole.LECTURER]: 'Лекції',
  [TeacherRole.PRACTICIAN]: 'Практики',
  [TeacherRole.EXAMINER]: 'Екзамени',
  [TeacherRole.OTHER]: 'Інше',
};

export const RoleColors: Record<TeacherRole, TagColor> = {
  [TeacherRole.LABORANT]: TagColor.MINT,
  [TeacherRole.LECTURER]: TagColor.INDIGO,
  [TeacherRole.PRACTICIAN]: TagColor.ORANGE,
  [TeacherRole.EXAMINER]: TagColor.VIOLET,
  [TeacherRole.OTHER]: TagColor.PRIMARY,
};

export const CathedraColors: Record<string, TagColor> = {
  ['ІПІ']: TagColor.VIOLET,
  ['ІСТ']: TagColor.MINT,
  ['ОТ']: TagColor.ORANGE,
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
  isTeachersPage = false,
  cathedras,
  isPersonalPage = false,
}) => {
  const isMobileMedium = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const place =
    isTeachersPage && isMobileMedium ? 3 - cathedras.length : roles.length;
  const extra = roles.length - place;
  return (
    <div className={cn(styles['card-roles'], className)}>
      {cathedras.map(cathedra => (
        <Tag
          size={TagSize.SMALL}
          text={cathedra.abbreviation}
          color={CathedraColors[cathedra.abbreviation]}
          variant={TagVariant.OUTLINE}
          key={cathedra.id}
        />
      ))}
      {roles.slice(0, place).map(role => (
        <Tag
          sx={{
            display: ['EXAMINER', 'OTHER'].includes(role) ? 'none' : 'flex',
          }}
          size={TagSize.SMALL}
          text={isPersonalPage && !isMobileMedium ? TagText[role] : ''}
          icon={isPersonalPage && !isMobileMedium ? null : TagIcons[role]}
          color={RoleColors[role]}
          key={role}
        />
      ))}
      {extra > 0 && (
        <Typography sx={stylesMui.extra} variant="body1Bold">
          +{extra}
        </Typography>
      )}
    </div>
  );
};
