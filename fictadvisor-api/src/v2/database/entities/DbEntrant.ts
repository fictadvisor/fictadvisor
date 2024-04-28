import { Contract, CustomerData, EntrantData, EntrantPriority, Priority, RepresentativeData } from '@prisma/client';
import { EducationalDegree, EducationalProgramType } from '@fictadvisor/utils/enums';
import { DbSpeciality } from './DbSpeciality';

export class DbEntrant {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string | null;
  degree: EducationalDegree;
  educationalProgram: string;
  programType: EducationalProgramType;
  studyType: string;
  studyForm: string;
  paymentType: string;
  benefit: boolean;
  group: string | null;
  competitivePoint: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  specialties?: DbSpeciality[];
  entrantData?: EntrantData;
  representativeData?: RepresentativeData;
  customerData?: CustomerData;
  contract?: Contract;
  priority?: EntrantPriority & {
    priorities?: Priority[],
  };
}