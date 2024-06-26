import { EducationProgram } from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { ExtendedPriorityDataBody } from '@/lib/api/contract/types/PriorityDataBody';

export const initialValues: ExtendedPriorityDataBody = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  specialty: '',
  day: '',
  isToAdmission: false,
  priorities: {
    1: '',
    2: '',
    3: '',
  },
  secretNumber: '',
  noMiddleName: false,
  isForcePushed: false,
  forcePushedNumber: '',
};

export const IPeduPrograms: DropDownOption[] = [
  {
    label: "Інженерія програмного забезпечення комп'ютерних систем",
    id: EducationProgram.CSSE,
  },
  {
    label: 'Інженерія програмного забезпечення інформаційних систем',
    id: EducationProgram.ISSE,
  },
];
export const ISTeduPrograms: DropDownOption[] = [
  {
    label: 'Інформаційне забезпечення робототехнічних систем',
    id: EducationProgram.ISRS,
  },
  {
    label: 'Інтегровані інформаційні системи',
    id: EducationProgram.IIS,
  },
  {
    label: 'Інформаційні управляючі системи та технології',
    id: EducationProgram.IMST,
  },
];
