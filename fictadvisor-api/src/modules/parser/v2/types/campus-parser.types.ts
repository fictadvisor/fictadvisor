import { BaseGroup } from './schedule-parser.types';

export enum CampusParserPairTag {
  lec,
  lab,
  prac,
}

export class CampusParserPair {
  lecturer: {
    name: string;
  };
  type: string;
  time: string;
  name: string;
  place: string;
  tag: CampusParserPairTag;
  dates: string[];
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
