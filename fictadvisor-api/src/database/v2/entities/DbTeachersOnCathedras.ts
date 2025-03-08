import { DbCathedra } from './DbCathedra';
import { DbTeacher } from './DbTeacher';

export class DbTeachersOnCathedras {
  teacher?: DbTeacher;
  teacherId: string;
  cathedra?: DbCathedra;
  cathedraId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
