import { Injectable } from '@nestjs/common';
import {
  CreateDisciplineDTO,
  QueryAllDisciplinesDTO,
  QuerySemesterDTO,
  UpdateDisciplineDTO,
} from '@fictadvisor/utils/requests';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { PaginatedData } from '../datas/PaginatedData';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

@Injectable()
export class DisciplineService {
  constructor (
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherService: DisciplineTeacherService,
  ) {}

  private DisciplineSearching = {
    name: (search: string) => ({
      subject: DatabaseUtils.getSearch({ search }, 'name'),
    }),
    groups: (ids: string[]) => ({
      group: {
        OR: ids?.map((id) => DatabaseUtils.getStrictSearch(id, 'id')),
      },
    }),
    semesters: (semesters: QuerySemesterDTO[]) => ({
      OR: semesters?.map(({ semester, year }) => ({
        ...DatabaseUtils.getStrictSearch(semester, 'semester'),
        ...DatabaseUtils.getStrictSearch(year, 'year'),
      })),
    }),
    teachers: (ids: string[]) => ({
      disciplineTeachers: {
        some: {
          OR: ids?.map((id) => DatabaseUtils.getStrictSearch(id, 'teacherId')),
        },
      },
    }),
  };

  private DisciplineSorting = {
    name: (order = 'asc') => ({ subject: { name: order } }),
    group: (order = 'asc') => ({ group: { code: order } }),
    semester: (order = 'desc') => ([{ year: order }, { semester: order }]),
  };

  async create (body: CreateDisciplineDTO) {
    const { teachers, ...data } = body;
    const disciplineTypes = teachers.flatMap((teacher) =>
      teacher.disciplineTypes.map((disciplineType) => ({ name: disciplineType })));

    const discipline = await this.disciplineRepository.create({
      ...data,
      disciplineTypes: {
        createMany: {
          data: disciplineTypes,
          skipDuplicates: true,
        },
      },
    });

    for (const teacher of teachers) {
      await this.disciplineTeacherService.create(
        teacher.teacherId,
        discipline.id,
        teacher.disciplineTypes
      );
    }

    return this.disciplineRepository.findById(discipline.id);
  }

  async getById (id: string) {
    return this.disciplineRepository.findById(id);
  }

  async getAll (body: QueryAllDisciplinesDTO): Promise<PaginatedData<DbDiscipline>> {
    const {
      sort: sortBy = 'name',
      search: name,
      groups,
      semesters,
      teachers,
      order,
    } = body;

    const sort = this.DisciplineSorting[sortBy](order);
    const data = {
      where: {
        AND: [
          this.DisciplineSearching.name(name),
          this.DisciplineSearching.groups(groups),
          this.DisciplineSearching.semesters(semesters),
          this.DisciplineSearching.teachers(teachers),
        ],
      },
      orderBy: sort,
    };
    return DatabaseUtils.paginate(this.disciplineRepository, body, data);
  }

  async getTeachers (disciplineId: string, disciplineType: DisciplineTypeEnum) {
    return this.disciplineTeacherRepository.findMany({
      where: {
        roles: {
          some: {
            disciplineType: {
              name: disciplineType,
            },
          },
        },
        discipline: {
          id: disciplineId,
        },
      },
    });
  }

  async deleteById (disciplineId: string): Promise<DbDiscipline> {
    return this.disciplineRepository.deleteById(disciplineId);
  }

  async updateById (id: string, data: UpdateDisciplineDTO): Promise<DbDiscipline> {
    return this.disciplineRepository.updateById(id, data);
  }
}
