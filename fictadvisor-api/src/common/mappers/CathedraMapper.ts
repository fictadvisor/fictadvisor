import {
  CathedraWithTeachersResponse,
  CathedraResponse,
  CathedraWithNumberOfTeachersResponse,
  TeacherResponse,
} from '@fictadvisor/utils/responses';
import { AcademicStatus, ScientificDegree, Position } from '@fictadvisor/utils/enums';
import { DbCathedra } from '../../database/v2/entities/DbCathedra';

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
      academicStatus: teacher.academicStatus as AcademicStatus,
      scientificDegree: teacher.scientificDegree as ScientificDegree,
      position: teacher.position as Position,
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
