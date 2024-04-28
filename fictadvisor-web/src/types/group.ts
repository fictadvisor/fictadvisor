import { State } from '@fictadvisor/utils/enums';

export interface Group {
  id: string;
  code: string;
  admissionYear: number;
  educationalProgramId: string;
  cathedra: {
    id: string;
    name: string;
    abbreviation: string;
    division: string;
  };
  captain: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    state: State;
  };
  speciality: { id: string; code: string; abbreviation: string; name: string };
}
