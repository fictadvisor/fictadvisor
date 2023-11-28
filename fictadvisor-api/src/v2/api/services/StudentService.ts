import { Injectable } from '@nestjs/common';
import { QueryAllStudentDTO } from '../dtos/QueryAllStudentDTO';
import { Prisma } from '@prisma/client';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { StudentRepository } from '../../database/repositories/StudentRepository';

@Injectable()
export class StudentService {
  constructor (
    private readonly studentRepository: StudentRepository,
  ) {}

  async getAll (query: QueryAllStudentDTO) {
    const { sort = 'lastName', order = 'asc' } = query;

    const search = {
      AND: [
        this.DisciplineSearching.fullName(query.search),
        this.DisciplineSearching.groups(query.groups),
        this.DisciplineSearching.states(query.states),
        this.DisciplineSearching.roles(query.roles),
      ],
    };

    const orderBy = [
      { [sort]: order },
      { lastName: order },
      { firstName: order },
      { middleName: order },
    ];

    const data: Prisma.StudentFindManyArgs = {
      where: search,
      orderBy,
    };

    return DatabaseUtils.paginate(this.studentRepository, query, data);
  }

  private DisciplineSearching = {
    fullName: (search: string) => (DatabaseUtils.getSearch({ search }, 'lastName', 'firstName', 'middleName')),
    states: (states: string[]) => DatabaseUtils.getSearchByArray(states, 'state'),
    groups: (groups: string[]) => ({ group: DatabaseUtils.getSearchByArray(groups, 'id') }),
    roles: (roles: string[]) => ({ roles: { some: { role: DatabaseUtils.getSearchByArray(roles, 'name') } } }),
  };
}