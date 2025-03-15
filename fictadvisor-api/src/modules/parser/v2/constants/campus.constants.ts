import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

export const CAMPUS_PARSER_DAY_NUMBER = {
  'Пн': 1,
  'Вв': 2,
  'Ср': 3,
  'Чт': 4,
  'Пт': 5,
  'Сб': 6,
  'Нд': 7,
};

export const CAMPUS_PARSER_DISCIPLINE_TYPE = {
  'lec': DisciplineTypeEnum.LECTURE,
  'prac': DisciplineTypeEnum.PRACTICE,
  'lab': DisciplineTypeEnum.LABORATORY,
};
