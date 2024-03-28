import { EducationProgram, Group, Speciality } from '@prisma/client';

export class DbEducationalProgram {
  id: string;
  speciality?: Speciality;
  specialityId: string;
  name: string;
  abbreviation: EducationProgram;
  groups?: Group[];
}