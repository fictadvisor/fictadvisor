import { EducationProgram, PriorityState } from '@fictadvisor/utils/enums';
import { FullNameWithSpecialtyDTO } from '@fictadvisor/utils/requests';
import { EntrantWithPriorityResponse } from '@fictadvisor/utils/responses';

export const initialValues: FullNameWithSpecialtyDTO = {
  firstName: '',
  middleName: '',
  lastName: '',
  specialty: '',
};

export const expectedValues: EntrantWithPriorityResponse = {
  firstName: '',
  middleName: '',
  lastName: '',
  priorities: {
    1: '' as unknown as EducationProgram,
    2: '' as unknown as EducationProgram,
    3: '' as unknown as EducationProgram,
  },
  specialty: '',
  state: '' as unknown as PriorityState,
} as EntrantWithPriorityResponse;
