import { Teacher, TeachersOnCathedras } from '@prisma/client/fictadvisor';

export class DbCathedra {
  id: string;
  name: string;
  abbreviation: string;
  division: string;
  teachers: (TeachersOnCathedras & { teacher: Teacher })[];
  createdAt: Date;
  updatedAt: Date;
}
