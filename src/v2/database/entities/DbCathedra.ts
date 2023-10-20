import { Teacher, TeachersOnCathedras } from '@prisma/client';

export class DbCathedra {
  id: string;
  name: string;
  abbreviation: string;
  teachers: (TeachersOnCathedras & { teacher: Teacher })[];
  createdAt: Date;
  updatedAt: Date;
}