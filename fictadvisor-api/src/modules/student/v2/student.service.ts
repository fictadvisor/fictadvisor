import { Injectable } from '@nestjs/common';
import {
  QueryAllStudentsDTO,
  UpdateStudentWithRolesDTO,
  CreateStudentWithRolesDTO,
  UpdateStudentSelectivesDTO,
} from '@fictadvisor/utils/requests';
import { GroupRoles, SortQGSParam } from '@fictadvisor/utils/enums';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { StudyingSemester } from '../../date/v2/date.service';
import { GroupService } from '../../group/v2/group.service';
import { UserService } from '../../user/v2/user.service';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { StudentRepository } from '../../../database/v2/repositories/student.repository';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { UserRepository } from '../../../database/v2/repositories/user.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { NotRegisteredException } from '../../../common/exceptions/not-registered.exception';
import { AlreadyExistException } from '../../../common/exceptions/already-exist.exception';
import { CaptainCanNotLeaveException } from '../../../common/exceptions/captain-can-not-leave.exception';
import { NotBelongException } from '../../../common/exceptions/not-belong.exception';
import { ExcessiveSelectiveDisciplinesException } from '../../../common/exceptions/excessive-selective-disciplines.exception';
import { AlreadySelectedException } from '../../../common/exceptions/already-selected.exception';
import { RoleName, SelectiveDiscipline, State } from '@prisma-client/fictadvisor';
import { DbStudent } from '../../../database/v2/entities/student.entity';

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

  async getAll (query: QueryAllStudentsDTO) {
    const { sort = SortQGSParam.LAST_NAME, order = 'asc' } = query;

    const data: PaginateArgs<'student'> = {
      where: {
        AND: [
          this.StudentSearching.fullName(query.search),
          this.StudentSearching.groups(query.groups),
          this.StudentSearching.states(query.states),
          this.StudentSearching.roles(query.roles),
        ],
      },
      orderBy: [
        { [sort]: order },
        { lastName: order },
        { firstName: order },
        { middleName: order },
      ],
    };

    return PaginationUtil.paginate<'student', DbStudent>(this.studentRepository, query, data);
  }

  private StudentSearching = {
    fullName: (search: string) => (DatabaseUtils.getSearch({ search }, 'lastName', 'firstName', 'middleName')),
    states: (states: string[]) => DatabaseUtils.getSearchByArray(states, 'state'),
    groups: (groups: string[]) => ({ group: DatabaseUtils.getSearchByArray(groups, 'id') }),
    roles: (roles: string[]) => ({ roles: { some: { role: DatabaseUtils.getSearchByArray(roles, 'name') } } }),
  };

  async createStudent (body: CreateStudentWithRolesDTO) {
    const { username, roleName, groupId, ...data } = body;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotRegisteredException('username');
    }

    const student = await this.studentRepository.findOne({ userId: user.id });
    if (student) {
      throw new AlreadyExistException('Student');
    }
    const { id: roleId } = await this.getRoleByGroupId(roleName, groupId);

    if (roleName === GroupRoles.CAPTAIN) {
      const oldCaptain = await this.groupService.findCaptain(groupId);
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
        create: { roleId },
      },
    });
  }

  async updateStudent (userId: string, body: UpdateStudentWithRolesDTO) {
    const student = await this.studentRepository.findOne({ userId });
    const role = student.roles.find(({ role }) => (Object.values(GroupRoles) as RoleName[]).includes(role.name));
    const oldRoleName = role?.role.name ?? GroupRoles.STUDENT;
    const { roleName = oldRoleName, groupId, ...fullName } = body;

    const changeGroup = groupId !== student.groupId ? this.changeGroup(groupId, userId, oldRoleName) : {};
    const roles = await this.getSwitchRoles(userId, roleName, groupId ?? student.groupId);

    return this.studentRepository.updateById(userId, {
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

    const oldGroupRole = await this.roleRepository.findOne({
      name: {
        in: Object.values(GroupRoles),
      },
      userRoles: {
        some: {
          studentId,
        },
      },
    });

    const { id: roleId } = await this.getRoleByGroupId(roleName, groupId);

    return {
      roles: {
        delete: {
          studentId_roleId: {
            studentId,
            roleId: oldGroupRole.id,
          },
        },
        create: { roleId },
      },
    };
  }

  private getRoleByGroupId (roleName: RoleName, groupId: string) {
    return this.roleRepository.findOne({
      groupRole: {
        groupId,
      },
      name: roleName,
    });
  }

  async updateStudentSelectives (userId: string, body: UpdateStudentSelectivesDTO) {
    const student = await this.studentRepository.findOne({ userId });
    const { connectedSelectives = [], disconnectedSelectives = [] } = body;
    const selectiveDisciplines = student.selectiveDisciplines
      .map((discipline) => discipline.discipline) as any as DbDiscipline[];

    await this.checkDisconnectedSelectives(student.selectiveDisciplines, disconnectedSelectives);
    await this.checkConnectedSelectives(student.groupId, connectedSelectives, selectiveDisciplines);
    await this.checkSelectiveAmount(
      student.groupId,
      selectiveDisciplines,
      connectedSelectives,
      disconnectedSelectives
    );

    return this.studentRepository.updateById(userId, {
      selectiveDisciplines: {
        deleteMany: {
          OR: disconnectedSelectives.map((disciplineId) => ({
            disciplineId,
            studentId: userId,
          }
          )),
        },
        createMany: {
          data: connectedSelectives.map((disciplineId) => ({ disciplineId })),
        },
      },
    });
  }

  private async checkSelectiveAmount (
    groupId: string,
    studentSelectives: DbDiscipline[],
    connectedSelectiveIds: string[],
    disconnectedSelectiveIds: string[],
  ) {
    const group = await this.groupRepository.findOne({ id: groupId });

    const connectedSelectives = await this.disciplineRepository.findMany({
      OR: connectedSelectiveIds.map((id) => ({ id })),
    });

    const disconnectedSelectives = await this.disciplineRepository.findMany({
      OR: disconnectedSelectiveIds.map((id) => ({ id })),
    });

    const uniqueSemesters = this.userService.getUniqueSemesters(connectedSelectives);

    for (const uniqueSemester of uniqueSemesters) {
      const connectedAmount = this.getAmount(connectedSelectives, uniqueSemester);
      const disconnectedAmount = this.getAmount(disconnectedSelectives, uniqueSemester);
      const studentAmount = this.getAmount(studentSelectives, uniqueSemester);
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
  private async checkDisconnectedSelectives (
    selectedSelectives: SelectiveDiscipline[],
    disconnectedSelectives: string[]
  ) {
    disconnectedSelectives.forEach((disciplineId) => {
      if (!selectedSelectives.some((selective) => selective.disciplineId === disciplineId)) {
        throw new NotBelongException('selective', 'student');
      }
    });
  }

  private async checkConnectedSelectives (
    groupId: string,
    connectedSelectives: string[],
    studentSelectives: DbDiscipline[]
  ) {
    const groupSelectives = await this.disciplineRepository.findMany({
      groupId,
      isSelective: true,
    });

    connectedSelectives.forEach((disciplineId) => {
      if (!groupSelectives.some((discipline) => disciplineId === discipline.id)) {
        throw new NotBelongException('discipline', 'group');
      }
      if (studentSelectives.some((discipline) => discipline.id === disciplineId)) {
        throw new AlreadySelectedException();
      }
    });
  }

  deleteStudent (userId: string) {
    return this.studentRepository.deleteById(userId);
  }

  getStudent (userId: string) {
    return this.studentRepository.findOne({ userId });
  }
}
