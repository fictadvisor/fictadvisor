import { BaseGroup } from './schedule-parser.types';

export enum CampusParserPairTag {
  lec,
  lab,
  prac,
}

export type CampusParserLecturer = {
  id: string;
  name: string;
}

export type CampusParserPair = {
  lecturer: CampusParserLecturer | null;
  type: string;
  time: string;
  name: string;
  place: string;
  tag: CampusParserPairTag;
  dates: string[];
}

export type CampusParserLecturerProfile = {
  profile: {
    id: number;
    fullName: string;
  } | null;
}

export type CampusParserTeacher = {
  lastName: string;
  firstName: string;
  middleName: string;
}

export type CampusParserDay = {
  day: string;
  pairs: CampusParserPair[];
}

export type CampusParserGroup = BaseGroup & {
  id: string;
  faculty: string;
}
