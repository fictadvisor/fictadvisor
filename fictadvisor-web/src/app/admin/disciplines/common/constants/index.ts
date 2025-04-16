import { DisciplineTypeEnum } from '@fictadvisor/utils/enums/db';

export const rolesData = [
  DisciplineTypeEnum.LECTURE,
  DisciplineTypeEnum.LABORATORY,
  DisciplineTypeEnum.PRACTICE,
  DisciplineTypeEnum.EXAM,
  DisciplineTypeEnum.CONSULTATION,
  DisciplineTypeEnum.WORKOUT,
];

export const rolesRepres = [
  'Лектор',
  'Лаборант',
  'Практик',
  'Екзаменатор',
  'Консультант',
  'Інше',
];

export const rolesText = {
  [DisciplineTypeEnum.LECTURE]: 'Лектор',
  [DisciplineTypeEnum.LABORATORY]: 'Лаборант',
  [DisciplineTypeEnum.PRACTICE]: 'Практик',
  [DisciplineTypeEnum.EXAM]: 'Екзаменатор',
  [DisciplineTypeEnum.CONSULTATION]: 'Консультант',
  [DisciplineTypeEnum.WORKOUT]: 'Інше',
};
