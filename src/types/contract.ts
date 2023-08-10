export enum StudyTypeParam {
  CONTRACT = 'Контракт',
  BUDGET = 'Бюджет',
}

export enum StudyFormParam {
  FULL_TIME = 'Денна',
  PART_TIME = 'Заочна',
}

export enum PaymentTypeParam {
  EVERY_YEAR = 'Щороку',
  EVERY_SEMESTER = 'Щосеместрово',
  EVERY_MONTH = 'Щомісяця',
}

export interface Fullname {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface EntrantBody extends Fullname {
  specialty: string;
}
