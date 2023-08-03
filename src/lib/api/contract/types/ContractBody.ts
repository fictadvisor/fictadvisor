export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface PersonalData {
  firstName: string;
  middleName?: string;
  lastName: string;
  passportSeries?: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  address: string;
  settlement: string;
  idCode?: string;
  phoneNumber: string;
  region: string;
  email: string;
  index: string;
}

interface MetaContract {
  speciality: string;
  studyType: string;
  studyForm: string;
  paymentType?: string;
  isToAdmission: boolean;
}

export interface HelperData {
  entrantHasForeignPassport: boolean;
  entrantHasOldPassport: boolean;
  entrantHasNoCode: boolean;
  entrantHasNoMiddleName: boolean;

  isAdult: boolean;
  secretNumber: string;

  representativeHasForeignPassport: boolean;
  representativeHasOldPassport: boolean;
  representativeHasNoCode: boolean;
  representativeHasNoMiddleName: boolean;
}

//kostili ebani
export interface ExtendedContractBody {
  entrant: PersonalData;
  representative: PersonalData;
  meta: MetaContract;
  helper: HelperData;
}

export interface PriorityData {
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  email: string;
  day: string;
  isToAdmission: boolean;
  priorities: {
    1: string;
    2: string;
    3: string;
  };
}

export type ContractBody = Omit<ExtendedContractBody, 'helper'>;
