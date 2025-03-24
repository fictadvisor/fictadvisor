import { BaseGroup } from './schedule-parser.types';

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
