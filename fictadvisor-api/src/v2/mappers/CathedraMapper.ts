import { DbCathedra } from '../database/entities/DbCathedra';
import { CathedraWithTeachersResponse } from '../api/responses/CathedraWithTeachersResponse';
import { CathedraResponse } from '../api/responses/CathedraResponse';
import { CathedraWithNumberOfTeachersResponse } from '../api/responses/CathedraWithNumberOfTeachersResponse';

export class CathedraMapper {
  getCathedra (cathedra: DbCathedra): CathedraResponse {
    return {
      id: cathedra.id,
      name: cathedra.name,
      abbreviation: cathedra.abbreviation,
      division: cathedra.division,
    };
  }
  getCathedraWithTeachers (cathedra: DbCathedra): CathedraWithTeachersResponse {
    const cathedraResponse = this.getCathedra(cathedra);
    return {
      ...cathedraResponse,
      teachers: cathedra.teachers.map(({ teacher: t }) => ({
        id: t.id,
        firstName: t.firstName,
        middleName: t.middleName,
        lastName: t.lastName,
        description: t.description,
        avatar: t.avatar,
        rating: t.rating.toNumber(),
      })),
    };
  }

  getCathedraWithNumberOfTeachers (cathedras: DbCathedra[]): CathedraWithNumberOfTeachersResponse[] {
    return cathedras.map((cathedra) => ({
      ...this.getCathedra(cathedra),
      teachers: cathedra.teachers.length,
    }));
  }
}