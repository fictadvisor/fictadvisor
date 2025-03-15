import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { BaseGroup } from './schedule-parser-types';

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

export enum CampusParserPairTag {
  lec,
  lab,
  prac,
}

export class CampusParserPair {
  teacherName: string;
  lecturerId: string;
  type: string;
  time: string;
  name: string;
  place: string;
  tag: CampusParserPairTag;
  teachers?: CampusParserTeacher[];
}

export class CampusParserTeacher {
  lastName: string;
  firstName: string;
  middleName: string;
}

export class CampusParserDay {
  day: string;
  pairs: CampusParserPair[];
}

export class CampusParserGroup extends BaseGroup {
  id: string;
  faculty: string;
}
