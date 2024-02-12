import { Injectable } from '@nestjs/common';
import { GroupRoles, QueryAllStudentDTO } from '../dtos/QueryAllStudentDTO';
import { Prisma, RoleName, SelectiveDiscipline, State } from '@prisma/client';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { SortQGSParam } from '../dtos/GroupStudentsQueryDTO';
import { UpdateStudentWithRolesDTO } from '../dtos/UpdateStudentDTO';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { GroupService } from './GroupService';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { CreateStudentWithRolesDTO } from '../dtos/CreateStudentDTO';
import { UserRepository } from '../../database/repositories/UserRepository';
import { NotRegisteredException } from '../../utils/exceptions/NotRegisteredException';
import { UserService } from './UserService';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { CaptainCanNotLeaveException } from '../../utils/exceptions/CaptainCanNotLeaveException';
import { UpdateStudentSelectiveDTO } from '../dtos/UpdateStudentSelectiveDTO';
import { NotBelongException } from '../../utils/exceptions/NotBelongException';
import { ExcessiveSelectiveDisciplinesException } from '../../utils/exceptions/ExcessiveSelectiveDisciplinesException';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { StudyingSemester } from '../../utils/date/DateService';
import { AlreadySelectedException } from '../../utils/exceptions/AlreadySelectedException';

@Injectable()
export class StudentService {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly groupRepository: GroupRepository,
    private readonly disciplineRepository: DisciplineRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async getAll (query: QueryAllStudentDTO) {
    const { sort = SortQGSParam.LAST_NAME, order = 'asc' } = query;

    const search = {
      AND: [
        this.StudentSearching.fullName(query.search),
        this.StudentSearching.groups(query.groups),
        this.StudentSearching.states(query.states),
        this.StudentSearching.roles(query.roles),
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

  private StudentSearching = {
    fullName: (search: string) => (DatabaseUtils.getSearch({ search }, 'lastName', 'firstName', 'middleName')),
    states: (states: string[]) => DatabaseUtils.getSearchByArray(states, 'state'),
    groups: (groups: string[]) => ({ group: DatabaseUtils.getSearchByArray(groups, 'id') }),
    roles: (roles: string[]) => ({ roles: { some: { role: DatabaseUtils.getSearchByArray(roles, 'name') } } }),
  };

  async createStudent (body: CreateStudentWithRolesDTO) {
    const { username, roleName, groupId, ...data } = body;
    const user = await this.userRepository.find({ username });
    if (!user) {
      throw new NotRegisteredException('username');
    }

    const student = await this.studentRepository.findById(user.id);
    if (student) {
      throw new AlreadyExistException('Student');
    }
    const role = await this.getRoleByGroupId(roleName, groupId);

    if (roleName === GroupRoles.CAPTAIN) {
      const oldCaptain = await this.groupService.getCaptain(groupId);
      if (oldCaptain) {
        await this.userService.changeGroupRole(oldCaptain.id, GroupRoles.STUDENT);
      }
    }

    return this.studentRepository.create({
      ...data,
      groupId,
      state: State.APPROVED,
      userId: user.id,
      roles: {
        create: {
          roleId: role.id,
        },
      },
    });
  }

  async updateStudent (id: string, body: UpdateStudentWithRolesDTO) {
    const student = await this.studentRepository.findById(id);
    const role = student.roles.find(({ role }) => (Object.values(GroupRoles) as RoleName[]).includes(role.name));
    const oldRoleName = role?.role.name ?? GroupRoles.STUDENT;
    const { roleName = oldRoleName, groupId, ...fullName } = body;

    const changeGroup = groupId !== student.groupId ? this.changeGroup(groupId, id, oldRoleName) : {};
    const roles = await this.getSwitchRoles(id, roleName, groupId ?? student.groupId);

    return this.studentRepository.updateById(id, {
      ...fullName,
      ...changeGroup,
      ...roles,
    });
  }

  private changeGroup (groupId: string, studentId: string, roleName: RoleName) {
    if (roleName === GroupRoles.CAPTAIN) {
      throw new CaptainCanNotLeaveException();
    }

    return {
      groupId,
      selectiveDisciplines: {
        deleteMany: {
          studentId,
        },
      },
    };
  }

  private async getSwitchRoles (studentId: string, roleName: RoleName, groupId: string) {
    if (roleName === GroupRoles.CAPTAIN) {
      await this.groupService.switchCaptain(groupId, studentId);
      return {};
    }

    const oldGroupRole = await this.roleRepository.find({
      name: {
        in: Object.values(GroupRoles),
      },
      userRoles: {
        some: {
          studentId,
        },
      },
    });

    const newGroupRole = await this.getRoleByGroupId(roleName, groupId);

    return {
      roles: {
        delete: {
          studentId_roleId: {
            studentId,
            roleId: oldGroupRole.id,
          },
        },
        create: {
          roleId: newGroupRole.id,
        },
      },
    };
  }

  private getRoleByGroupId (roleName: RoleName, groupId: string) {
    return this.roleRepository.find({
      groupRole: {
        groupId,
      },
      name: roleName,
    });
  }

  async updateStudentSelective (id: string, body: UpdateStudentSelectiveDTO) {
    const student = await this.studentRepository.findById(id);
    const { connectedSelective = [], disconnectedSelective = [] } = body;
    const selectiveDisciplines = student.selectiveDisciplines
      .map((discipline) => discipline.discipline) as any as DbDiscipline[];

    await this.checkDisconnectedSelective(student.selectiveDisciplines, disconnectedSelective);
    await this.checkConnectedSelective(student.groupId, connectedSelective, selectiveDisciplines);
    await this.checkSelectiveAmount(
      student.groupId,
      selectiveDisciplines,
      connectedSelective,
      disconnectedSelective
    );

    return this.studentRepository.updateById(id, {
      selectiveDisciplines: {
        deleteMany: {
          OR: disconnectedSelective.map((disciplineId) => ({
            disciplineId,
            studentId: id,
          }
          )),
        },
        createMany: {
          data: connectedSelective.map((disciplineId) => ({ disciplineId })),
        },
      },
    });
  }

  private async checkSelectiveAmount (
    groupId: string,
    studentSelective: DbDiscipline[],
    connectedSelectiveIds: string[],
    disconnectedSelectiveIds: string[],
  ) {
    const group = await this.groupRepository.findById(groupId);

    const connectedSelective = await this.disciplineRepository.findMany({
      where: {
        OR: connectedSelectiveIds.map((id) => ({ id })),
      },
    });

    const disconnectedSelective = await this.disciplineRepository.findMany({
      where: {
        OR: disconnectedSelectiveIds.map((id) => ({ id })),
      },
    });

    const uniqueSemesters = this.userService.getUniqueSemesters(connectedSelective);

    for (const uniqueSemester of uniqueSemesters) {
      const connectedAmount = this.getAmount(connectedSelective, uniqueSemester);
      const disconnectedAmount = this.getAmount(disconnectedSelective, uniqueSemester);
      const studentAmount = this.getAmount(studentSelective, uniqueSemester);
      const { amount } = group.selectiveAmounts
        .find(({ year, semester }) => uniqueSemester.year === year && uniqueSemester.semester === semester);

      if (amount < connectedAmount + studentAmount - disconnectedAmount) {
        throw new ExcessiveSelectiveDisciplinesException();
      }
    }
  }

  private getAmount (disciplines: DbDiscipline[], { year, semester }: StudyingSemester) {
    return disciplines
      .filter((discipline) => discipline.year === year && discipline.semester === semester)
      .length;
  }
  private async checkDisconnectedSelective (
    selectedSelective: SelectiveDiscipline[],
    disconnectedSelective: string[]
  ) {
    disconnectedSelective.forEach((disciplineId) => {
      if (!selectedSelective.some((selective) => selective.disciplineId === disciplineId)) {
        throw new NotBelongException('selective', 'student');
      }
    });
  }

  private async checkConnectedSelective (
    groupId: string,
    connectedSelective: string[],
    studentSelective: DbDiscipline[]
  ) {
    const groupSelective = await this.disciplineRepository.findMany({
      where: {
        groupId,
        isSelective: true,
      },
    });

    connectedSelective.forEach((disciplineId) => {
      if (!groupSelective.some((discipline) => disciplineId === discipline.id)) {
        throw new NotBelongException('discipline', 'group');
      }
      if (studentSelective.some((discipline) => discipline.id === disciplineId)) {
        throw new AlreadySelectedException();
      }
    });
  }

  deleteStudent (id: string) {
    return this.studentRepository.deleteById(id);
  }

  getStudent (studentId: string) {
    return this.studentRepository.findById(studentId);
  }
}