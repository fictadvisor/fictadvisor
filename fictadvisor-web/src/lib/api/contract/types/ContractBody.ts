import {
  EducationalDegree,
  EducationalProgramType,
  PaymentTypeParam,
  StudyFormParam,
  StudyTypeParam,
} from '@fictadvisor/utils/enums';

import { Fullname } from '@/types/contract';
import { PartialBy } from '@/types/utils/PartialBy';

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
  degree: EducationalDegree;
  programType: EducationalProgramType;
  educationalProgram: string;
  speciality: string;
  studyType: StudyTypeParam;
  studyForm: StudyFormParam;
  paymentType?: PaymentTypeParam;
  isToAdmission: boolean;
  isForcePushed: boolean;
}

export enum PassportType {
  ID = 'id_card',
  FOREIGN = 'foreign',
  OLD = 'old',
}

export interface HelperData {
  entrantPassportType: PassportType;
  entrantHasNoCode: boolean;
  entrantHasNoMiddleName: boolean;

  isAdult: boolean;
  secretNumber: string;
  forcePushedNumber: string;

  representativePassportType: PassportType;
  representativeHasNoCode: boolean;
  representativeHasNoMiddleName: boolean;

  customerPassportType: PassportType;
  customerHasNoCode: boolean;
  customerHasNoMiddleName: boolean;

  hasCustomer: boolean;
}

//kostili ebani
export interface ExtendedContractBody {
  entrant: PersonalData;
  representative: PartialBy<PersonalData, 'email'>;
  customer: PartialBy<PersonalData, 'email'>;
  meta: MetaContract;
  helper: HelperData;
}
