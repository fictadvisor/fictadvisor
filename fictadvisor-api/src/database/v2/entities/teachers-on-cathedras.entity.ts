import { DbCathedra } from './cathedra.entity';
import { DbTeacher } from './teacher.entity';

export class DbTeachersOnCathedras {
  teacher?: DbTeacher;
  teacherId: string;
  cathedra?: DbCathedra;
  cathedraId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
