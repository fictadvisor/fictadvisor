import { FC, ReactNode } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { CathedraResponse } from '@fictadvisor/utils/responses';
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

import * as stylesMui from './CardDisciplineTypes.styles';

import styles from './CardDisciplineTypes.module.scss';

export interface CardDisciplineTypesProps {
  disciplineTypes: DisciplineTypeEnum[];
  className?: string;
  isTeachersPage?: boolean;
  isPersonalPage?: boolean;
  cathedras: CathedraResponse[];
}

export const TagText: Record<DisciplineTypeEnum, string> = {
  [DisciplineTypeEnum.LABORATORY]: 'Лабораторні',
  [DisciplineTypeEnum.LECTURE]: 'Лекції',
  [DisciplineTypeEnum.PRACTICE]: 'Практики',
  [DisciplineTypeEnum.EXAM]: 'Екзамени',
  [DisciplineTypeEnum.CONSULTATION]: 'Консультації',
  [DisciplineTypeEnum.WORKOUT]: 'Відпрацювання',
};

export const RoleColors: Record<DisciplineTypeEnum, TagColor> = {
  [DisciplineTypeEnum.LABORATORY]: TagColor.MINT,
  [DisciplineTypeEnum.LECTURE]: TagColor.INDIGO,
  [DisciplineTypeEnum.PRACTICE]: TagColor.ORANGE,
  [DisciplineTypeEnum.EXAM]: TagColor.VIOLET,
  [DisciplineTypeEnum.CONSULTATION]: TagColor.PRIMARY,
  [DisciplineTypeEnum.WORKOUT]: TagColor.PRIMARY,
};

export const CathedraColors: Record<string, TagColor> = {
  ['ІПІ']: TagColor.VIOLET,
  ['ІСТ']: TagColor.MINT,
  ['ОТ']: TagColor.ORANGE,
};

const TagIcons: Record<DisciplineTypeEnum, ReactNode> = {
  [DisciplineTypeEnum.LABORATORY]: <BeakerIcon />,
  [DisciplineTypeEnum.LECTURE]: <BookOpenIcon />,
  [DisciplineTypeEnum.PRACTICE]: <WrenchIcon />,
  [DisciplineTypeEnum.EXAM]: null,
  [DisciplineTypeEnum.CONSULTATION]: null,
  [DisciplineTypeEnum.WORKOUT]: null,
};

export const CardDisciplineTypes: FC<CardDisciplineTypesProps> = ({
  disciplineTypes,
  className,
  isTeachersPage = false,
  cathedras,
  isPersonalPage = false,
}) => {
  const isMobileMedium = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const place =
    isTeachersPage && isMobileMedium
      ? 3 - cathedras.length
      : disciplineTypes.length;
  const extra = disciplineTypes.length - place;
  return (
    <div className={cn(styles['card-disciplineTypes'], className)}>
      {cathedras.map(cathedra => (
        <Tag
          size={TagSize.SMALL}
          text={cathedra.abbreviation}
          color={CathedraColors[cathedra.abbreviation]}
          variant={TagVariant.OUTLINE}
          key={cathedra.id}
        />
      ))}
      {disciplineTypes.slice(0, place).map(role => (
        <Tag
          sx={{
            display: ['EXAM', 'CONSULTATION', 'WORKOUT'].includes(role)
              ? 'none'
              : 'flex',
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
