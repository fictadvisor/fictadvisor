import { Fullname } from '@/types/contract';

import { PartialBy } from './utils';

export interface PersonalData extends Fullname {
  passportSeries?: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  address: string;
  settlement: string;
  idCode?: string;
  phoneNumber: string;
  region?: string;
  index: string;
  email: string;
}

interface MetaContract {
  speciality: string;
  studyType: string;
  studyForm: string;
  paymentType?: string;
  isToAdmission: boolean;
  isForcePushed: boolean;
}

export interface HelperData {
  entrantHasForeignPassport: boolean;
  entrantHasOldPassport: boolean;
  entrantHasNoCode: boolean;
  entrantHasNoMiddleName: boolean;

  isAdult: boolean;
  secretNumber: string;
  forcePushedNumber: string;

  representativeHasForeignPassport: boolean;
  representativeHasOldPassport: boolean;
  representativeHasNoCode: boolean;
  representativeHasNoMiddleName: boolean;
}

//kostili ebani
export interface ExtendedContractBody {
  entrant: PersonalData;
  representative: PartialBy<PersonalData, 'email'>;
  meta: MetaContract;
  helper: HelperData;
}

export type ContractBody = Omit<ExtendedContractBody, 'helper'>;
