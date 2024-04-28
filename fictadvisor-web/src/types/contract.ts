import { EducationalDegree } from '@fictadvisor/utils/enums';

export const StudyDegree = {
  [EducationalDegree.BACHELOR]: EducationalDegree.BACHELOR,
  [EducationalDegree.MASTER]: EducationalDegree.MASTER,
};

export enum MasterEducationProgram {
  CIS = 'CIS',
  IS = 'IS',
  CS = 'CS',
  CSN = 'CSN',
  IMST = 'IMST',
  IIS = 'IIS',
  ISRS = 'ISRS',
}

export interface Fullname {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface EntrantBody extends Fullname {
  specialty: string;
}
