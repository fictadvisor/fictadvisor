import { DbCathedra } from '../database/entities/DbCathedra';
import { CathedraWithTeachersResponse } from '../api/responses/CathedraWithTeachersResponse';
import { CathedraResponse } from '../api/responses/CathedraResponse';
import { CathedraWithNumberOfTeachersResponse } from '../api/responses/CathedraWithNumberOfTeachersResponse';
import { TeacherResponse } from '../api/responses/TeacherResponse';

export class CathedraMapper {
  getCathedra (cathedra: DbCathedra): CathedraResponse {
    return {
      id: cathedra.id,
      name: cathedra.name,
      abbreviation: cathedra.abbreviation,
      division: cathedra.division,
    };
  }

  getTeachersFromCathedras (cathedras: DbCathedra[]): TeacherResponse[] {
    return cathedras.flatMap((cathedra) => this.getTeachers(cathedra));
  }

  getTeachers (cathedra: DbCathedra) {
    return cathedra.teachers.map(({ teacher }) => ({
      id: teacher.id,
      firstName: teacher.firstName,
      middleName: teacher.middleName,
      lastName: teacher.lastName,
      description: teacher.description,
      avatar: teacher.avatar,
      rating: teacher.rating.toNumber(),
    }));
  }

  getCathedraWithTeachers (cathedra: DbCathedra): CathedraWithTeachersResponse {
    const cathedraResponse = this.getCathedra(cathedra);
    return {
      ...cathedraResponse,
      teachers: this.getTeachers(cathedra),
    };
  }

  getCathedraWithNumberOfTeachers (cathedras: DbCathedra[]): CathedraWithNumberOfTeachersResponse[] {
    return cathedras.map((cathedra) => ({
      ...this.getCathedra(cathedra),
      teachers: cathedra.teachers.length,
    }));
  }
}