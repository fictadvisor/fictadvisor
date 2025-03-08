import { Injectable } from '@nestjs/common';
import {
  CreateDisciplineDTO,
  QueryAllDisciplinesDTO,
  QuerySemesterDTO,
  UpdateDisciplineDTO,
} from '@fictadvisor/utils/requests';
import { DisciplineTeacherService } from '../../teacher/v2/DisciplineTeacherService';
import { DisciplineRepository } from '../../../database/v2/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/DisciplineTeacherRepository';
import { DbDiscipline } from '../../../database/v2/entities/DbDiscipline';
import { PaginatedData } from '../../../database/types/paginated.data';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { Prisma } from '@prisma/client/fictadvisor';
import { DatabaseUtils, PaginateArgs } from '../../../database/v2/database.utils';

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
    name: (order: Prisma.SortOrder = 'asc') => ({ subject: { name: order } }),
    group: (order: Prisma.SortOrder = 'asc') => ({ group: { code: order } }),
    semester: (order: Prisma.SortOrder = 'desc') => ([{ year: order }, { semester: order }]),
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

    return this.disciplineRepository.findOne({ id: discipline.id });
  }

  async getById (id: string) {
    return this.disciplineRepository.findOne({ id });
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
    const data: PaginateArgs<'discipline'> = {
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
    return DatabaseUtils.paginate<'discipline', DbDiscipline>(this.disciplineRepository, body, data);
  }

  async getTeachers (disciplineId: string, disciplineType: DisciplineTypeEnum) {
    return this.disciplineTeacherRepository.findMany({
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
    });
  }

  async deleteById (id: string): Promise<DbDiscipline> {
    return this.disciplineRepository.deleteById(id);
  }

  async updateById (id: string, data: UpdateDisciplineDTO): Promise<DbDiscipline> {
    return this.disciplineRepository.updateById(id, data);
  }
}
