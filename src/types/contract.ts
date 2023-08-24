export enum StudyTypeParam {
  CONTRACT = 'Контракт',
  BUDGET = 'Бюджет',
}

export enum StudyFormParam {
  FULL_TIME = 'Денна',
  PART_TIME = 'Заочна',
}

export enum StudyDegree {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
}

export enum EducationalProgramType {
  PROFESSIONAL = 'PROFESSIONAL',
  SCIENTIFIC = 'SCIENTIFIC',
}

export enum PaymentTypeParam {
  EVERY_YEAR = 'Щороку',
  EVERY_SEMESTER = 'Щосеместрово',
  EVERY_MONTH = 'Щомісяця',
}

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
