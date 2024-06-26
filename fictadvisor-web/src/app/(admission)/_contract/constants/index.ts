import {
  EducationalDegree,
  EducationalProgramType,
  PaymentTypeParam,
  StudyFormParam,
  StudyTypeParam,
} from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  ExtendedContractBody,
  PassportType,
} from '@/lib/api/contract/types/ContractBody';
export const kyiv = 'м. Київ';

export const REGIONS: DropDownOption[] = [
  { label: 'м. Київ', id: kyiv },
  { label: 'Київська обл.', id: 'Київська обл.' },
  { label: 'Вінницька обл.', id: 'Вінницька обл.' },
  { label: 'Волинська обл.', id: 'Волинська обл.' },
  { label: 'Дніпропетровська обл.', id: 'Дніпропетровська обл.' },
  { label: 'Донецька обл.', id: 'Донецька обл.' },
  { label: 'Житомирська обл.', id: 'Житомирська обл.' },
  { label: 'Закарпатська обл.', id: 'Закарпатська обл.' },
  { label: 'Запорізька обл.', id: 'Запорізька обл.' },
  { label: 'Івано-Франківська обл.', id: 'Івано-Франківська обл.' },
  { label: 'Кіровоградська обл.', id: 'Кіровоградська обл.' },
  { label: 'АР Крим', id: 'АР Крим' },
  { label: 'Луганська обл.', id: 'Луганська обл.' },
  { label: 'Львівська обл.', id: 'Львівська обл.' },
  { label: 'Миколаївська обл.', id: 'Миколаївська обл.' },
  { label: 'Одеська обл.', id: 'Одеська обл.' },
  { label: 'Полтавська обл.', id: 'Полтавська обл.' },
  { label: 'Рівненська обл.', id: 'Рівненська обл.' },
  { label: 'Сумська обл.', id: 'Сумська обл.' },
  { label: 'Тернопільська обл.', id: 'Тернопільська обл.' },
  { label: 'Харківська обл.', id: 'Харківська обл.' },
  { label: 'Херсонська обл.', id: 'Херсонська обл.' },
  { label: 'Хмельницька обл.', id: 'Хмельницька обл.' },
  { label: 'Черкаська обл.', id: 'Черкаська обл.' },
  { label: 'Чернівецька обл.', id: 'Чернівецька обл.' },
  { label: 'Чернігівська обл.', id: 'Чернігівська обл.' },
];

export const initialValues: ExtendedContractBody = {
  entrant: {
    firstName: '',
    middleName: '',
    lastName: '',
    passportSeries: '',
    passportNumber: '',
    passportInstitute: '',
    passportDate: '',
    address: '',
    settlement: '',
    idCode: '',
    phoneNumber: '',
    region: '',
    email: '',
    index: '',
  },
  representative: {
    firstName: '',
    middleName: '',
    lastName: '',
    passportSeries: '',
    passportNumber: '',
    passportInstitute: '',
    passportDate: '',
    address: '',
    settlement: '',
    idCode: '',
    region: '',
    phoneNumber: '',
    email: '',
    index: '',
  },
  customer: {
    firstName: '',
    middleName: '',
    lastName: '',
    passportSeries: '',
    passportNumber: '',
    passportInstitute: '',
    passportDate: '',
    address: '',
    settlement: '',
    idCode: '',
    region: '',
    phoneNumber: '',
    email: '',
    index: '',
  },
  meta: {
    degree: '' as EducationalDegree,
    programType: '' as EducationalProgramType,
    educationalProgram: '',

    studyType: '' as StudyTypeParam,
    studyForm: '' as StudyFormParam,
    paymentType: '' as PaymentTypeParam,
    speciality: '',
    isToAdmission: false,
    isForcePushed: false,
  },
  helper: {
    entrantPassportType: PassportType.ID,
    entrantHasNoCode: false,
    entrantHasNoMiddleName: false,

    representativePassportType: PassportType.ID,
    representativeHasNoCode: false,
    representativeHasNoMiddleName: false,

    customerPassportType: PassportType.ID,
    customerHasNoCode: false,
    customerHasNoMiddleName: false,

    hasCustomer: false,
    isAdult: false,

    secretNumber: '',
    forcePushedNumber: '',
  },
};
