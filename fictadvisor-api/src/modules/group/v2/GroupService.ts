import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ApproveDTO,
  CreateGroupDTO,
  EmailDTO,
  GroupStudentsQueryDTO,
  QueryAllGroupsDTO,
  QuerySemesterDTO,
  SortDTO,
  UpdateGroupDTO,
  OrdinaryStudentResponse,
  OrderQAParam,
  SortQAGroupsParam,
  SortQGSParam, Sort,
} from '@fictadvisor/utils';
import { UserService } from '../../user/v2/UserService';
import { FileService } from '../../file/FileService';
import { DateService } from '../../date/DateService';
import { Prisma, RoleName, State, User } from '@prisma/client/fictadvisor';
import { DatabaseUtils, PaginateArgs } from '../../../database/v2/database.utils';
import { DbGroup } from '../../../database/v2/entities/DbGroup';
import { DbDiscipline } from '../../../database/v2/entities/DbDiscipline';
import { DbStudent } from '../../../database/v2/entities/DbStudent';
import { DbUser } from '../../../database/v2/entities/DbUser';
import { GroupRepository } from '../../../database/v2/repositories/GroupRepository';
import { StudentRepository } from '../../../database/v2/repositories/StudentRepository';
import { DisciplineRepository } from '../../../database/v2/repositories/DisciplineRepository';
import { UserRepository } from '../../../database/v2/repositories/UserRepository';
import { RoleRepository } from '../../../database/v2/repositories/RoleRepository';
import { AlreadyRegisteredException } from '../../../common/exceptions/AlreadyRegisteredException';
import { NoPermissionException } from '../../../common/exceptions/NoPermissionException';
import { InvalidEntityIdException } from '../../../common/exceptions/InvalidEntityIdException';
import { StudentIsAlreadyCaptainException } from '../../../common/exceptions/StudentIsAlreadyCaptainException';
import { NotApprovedException } from '../../../common/exceptions/NotApprovedException';
import { AbsenceOfCaptainException } from '../../../common/exceptions/AbsenceOfCaptainException';
import { AVATARS } from '../../auth/v2/AuthService';
import { PaginatedData } from '../../../database/types/paginated.data';

const ROLE_LIST = [
  {
    name: RoleName.CAPTAIN,
    weight: 100,
    grants: {
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.MODERATOR,
    weight: 75,
    grants: {
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.STUDENT,
    weight: 50,
    grants: {
      'groups.$groupId.events.create': { set: false, weight: 5 },
      'groups.$groupId.events.update': { set: false, weight: 5 },
      'groups.$groupId.events.delete': { set: false, weight: 5 },
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.students.get': { set: true, weight: 4 },
      'groups.$groupId.students.*': { set: false, weight: 3 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
];

@Injectable()
export class GroupService {
  constructor (
    private groupRepository: GroupRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private disciplineRepository: DisciplineRepository,
    private dateService: DateService,
    private fileService: FileService,
  ) {}

  async create ({ code, eduProgramId, cathedraId, admissionYear }: CreateGroupDTO): Promise<DbGroup>  {
    const group = await this.groupRepository.create({
      code,
      cathedraId,
      educationalProgramId: eduProgramId,
      admissionYear,
    });
    await this.addPermissions(group.id);
    return group;
  }

  async getOrCreate (
    { code, eduProgramId, cathedraId, admissionYear }:
    Omit<UpdateGroupDTO, 'code'> & { code: string },
  ): Promise<DbGroup>  {
    const group =
      await this.groupRepository.findOne({ code }) ??
      await this.groupRepository.create({
        code,
        cathedraId,
        educationalProgramId: eduProgramId,
        admissionYear,
      });

    const permissionsCount = await this.roleRepository.count({
      groupRole: {
        group: { code },
      },
    });

    if (permissionsCount === 0) {
      await this.addPermissions(group.id);
    }
    return group;
  }

  async getAll (query: QueryAllGroupsDTO): Promise<PaginatedData<DbGroup>> {
    if (query.sort === SortQAGroupsParam.CAPTAIN) {
      return this.getAllByCaptain(query);
    }

    const data: PaginateArgs<'group'> = {
      where: {
        AND: [
          this.GroupSearching.code(query.search),
          this.GroupSearching.specialities(query.specialities),
          this.GroupSearching.cathedras(query.cathedras),
          this.GroupSearching.courses(query.courses),
        ],
      },
      ...this.getGroupSorting(query),
    };
    return DatabaseUtils.paginate<'group', DbGroup>(this.groupRepository, query, data);
  }

  private async getAllByCaptain (query: QueryAllGroupsDTO): Promise<PaginatedData<DbGroup>> {
    const data: PaginateArgs<'student'> = {
      where: {
        group: {
          AND: [
            this.GroupSearching.code(query.search),
            this.GroupSearching.specialities(query.specialities),
            this.GroupSearching.cathedras(query.cathedras),
            this.GroupSearching.courses(query.courses),
          ],
        },
        roles: {
          some: {
            role: {
              name: RoleName.CAPTAIN,
            },
          },
        },
      },
      orderBy: {
        lastName: query.order ?? 'asc',
      },
    };

    const captains = await DatabaseUtils.paginate<'student', DbStudent>(this.studentRepository, query, data);
    const groups = captains.data.map((captain) => {
      const group = captain.group;
      delete captain.group;
      group.students = [captain];
      return group;
    });

    return {
      data: groups,
      pagination: captains.pagination,
    };
  }

  private GroupSearching = {
    code: (search: string) => DatabaseUtils.getSearch({ search }, 'code'),
    specialities: (specialities: string[]) => {
      if (!specialities?.length) return {};
      return {
        educationalProgram: {
          speciality: {
            id: {
              in: specialities,
            },
          },
        },
      };
    },
    cathedras: (cathedras: string[]) => {
      if (!cathedras?.length) return {};
      return {
        cathedra: {
          id: {
            in: cathedras,
          },
        },
      };
    },
    courses: (courses: number[]) => {
      if (!courses?.length) return {};

      const courseDate = new Date();
      courseDate.setMonth(courseDate.getMonth() + 4);
      const courseYear = courseDate.getFullYear();

      return {
        admissionYear: {
          in: courses?.map((course) => courseYear-course),
        },
      };
    },
  };

  private getGroupSorting ({ sort, order }: SortDTO): Sort {
    order = order ?? 'asc';

    if (sort === SortQAGroupsParam.CODE) return { orderBy: [{ code: order }] };
    if (sort === SortQAGroupsParam.ADMISSION) return { orderBy: [{ admissionYear: order }] };
    return { orderBy: [{ code: order }] };
  }

  async get (id: string): Promise<DbGroup> {
    return this.groupRepository.findOne({ id });
  }

  async getDisciplineTeachers (groupId: string, { year, semester }: QuerySemesterDTO): Promise<DbDiscipline[]> {
    this.dateService.checkYearAndSemester(year, semester);
    return this.disciplineRepository.findMany({
      groupId,
      semester,
      year,
    });
  }

  async getSelectiveDisciplines (groupId: string): Promise<DbDiscipline[]> {
    return this.disciplineRepository.findMany({
      groupId,
      isSelective: true,
    });
  }

  async addUnregistered (groupId: string, body: EmailDTO): Promise<DbUser[]> {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.findOne({ email });
      if (user) throw new AlreadyRegisteredException();
    }
    for (const email of body.emails) {
      const user = await this.userRepository.create({
        email,
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      });
      await this.studentRepository.create({
        userId: user.id,
        groupId: groupId,
        state: State.APPROVED,
      });
      await this.addGroupRole(groupId, user.id, RoleName.STUDENT);
      users.push(user);
    }
    return users;
  }

  async verifyStudent (groupId: string, userId: string, data: ApproveDTO): Promise<DbStudent> {
    const verifiedStudent = await this.studentRepository.updateById(userId, { state: data.state });

    if (data.state === State.APPROVED) {
      await this.addGroupRole(groupId, userId, RoleName.STUDENT);
      await this.userService.putSelective(userId);
    }

    return verifiedStudent;
  }

  async addGroupRole (groupId: string, userId: string, name: RoleName): Promise<void> {
    const { id } = await this.roleRepository.findOne({
      groupRole: {
        groupId,
        role: {
          name,
        },
      },
    });
    await this.userService.giveRole(userId, id);
  }

  async removeStudent (groupId: string, userId: string, reqUser: User): Promise<void> {
    const userRole = await this.userService.getGroupRoleDB(userId);
    const reqUserRole = await this.userService.getGroupRoleDB(reqUser.id);

    if (reqUserRole.weight <= userRole.weight) {
      throw new NoPermissionException();
    }
    if (userRole.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.userService.removeRole(
      userId,
      userRole.id,
    );

    const user = await this.userRepository.findOne({ id: userId });

    await this.studentRepository.updateById(userId, { state: State.DECLINED });
    if (!user.username) {
      await this.userRepository.findOne({ id: userId });
    }
  }

  async findCaptain (groupId: string): Promise<DbUser> {
    const captain = await this.studentRepository.findOne({
      groupId,
      roles: {
        some: {
          role: {
            name: RoleName.CAPTAIN,
          },
        },
      },
    });

    return captain?.user;
  }

  async getCaptain (groupId: string) {
    const captain = await this.findCaptain(groupId);

    if (!captain) {
      throw new AbsenceOfCaptainException();
    }

    return captain;
  }

  async deleteGroup (groupId: string): Promise<DbGroup> {
    await this.roleRepository.delete({ groupRole: { groupId } });
    await this.studentRepository.update({ group: { id: groupId } }, { state: State.DECLINED });
    return this.groupRepository.deleteById(groupId);
  }

  async getStudents (groupId: string, { sort, order }: GroupStudentsQueryDTO): Promise<DbStudent[]> {
    const orderBy: Prisma.StudentOrderByWithRelationInput[] = [];
    if (sort) {
      if (!order) order = OrderQAParam.ASC;
      orderBy.push({ [sort]: order });
      orderBy.push({ [SortQGSParam.LAST_NAME]: order });
      orderBy.push({ [SortQGSParam.FIRST_NAME]: order });
      orderBy.push({ [SortQGSParam.MIDDLE_NAME]: order });
    }

    return this.studentRepository.findMany({
      groupId,
      state: State.APPROVED,
    }, undefined, undefined, orderBy);
  }

  async updateGroup (groupId: string, {
    code,
    eduProgramId,
    cathedraId,
    admissionYear,
    captainId,
    moderatorIds,
  }: UpdateGroupDTO): Promise<DbGroup> {
    if (captainId) {
      await this.switchCaptain(groupId, captainId);
    }

    if (moderatorIds?.length > 0) {
      await this.switchModerators(groupId, moderatorIds);
    }

    return this.groupRepository.updateById(groupId, {
      code,
      cathedraId,
      educationalProgramId: eduProgramId,
      admissionYear,
    });
  }

  async getUnverifiedStudents (groupId: string): Promise<DbStudent[]> {
    return this.studentRepository.findMany({
      groupId,
      state: State.PENDING,
    });
  }

  private async addPermissions (groupId: string): Promise<void> {
    for (const { grants, ...roles } of ROLE_LIST) {

      const grantList = Object.entries(grants).map(([permission, description]) => ({
        permission: permission.replace('$groupId', groupId),
        ...description,
      }));

      await this.roleRepository.create({
        ...roles,
        grants: {
          create: grantList,
        },
        groupRole: {
          create: {
            groupId,
          },
        },
      });
    }
  }

  async switchCaptain (groupId: string, studentId: string): Promise<OrdinaryStudentResponse> {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();
    const oldCaptain = await this.findCaptain(groupId);

    if (oldCaptain) {
      if (oldCaptain.id === studentId) throw new StudentIsAlreadyCaptainException();
      await this.userService.changeGroupRole(oldCaptain.id, RoleName.STUDENT);
    }

    await this.userService.changeGroupRole(studentId, RoleName.CAPTAIN);
    return this.userService.getUser(studentId);
  }

  async switchModerators (groupId: string, studentIds: string[]): Promise<void> {
    const students = await this.studentRepository.findMany({ groupId });

    const oldModerators = students.filter(
      (student) => student.roles.find(({ role }) => role.name === RoleName.MODERATOR)
    );

    const newModerators = students.filter(
      (student) => studentIds.find((id) => id === student.userId)
    );

    if (newModerators.length !== studentIds.length) {
      throw new InvalidEntityIdException('Student');
    }

    for (const oldModerator of oldModerators) {
      await this.userService.changeGroupRole(oldModerator.userId, RoleName.STUDENT);
    }

    for (const studentId of studentIds) {
      await this.userService.changeGroupRole(studentId, RoleName.MODERATOR);
    }
  }

  private async isStudentInGroup (groupId: string, userId: string): Promise<boolean> {
    const student = await this.studentRepository.findOne({ userId });
    if (!student) throw new InvalidEntityIdException('User');
    return student.groupId === groupId;
  }

  async getGroupsWithTelegramGroups (): Promise<DbGroup[]> {
    return this.groupRepository.findMany({
      telegramGroups: {
        some: {},
      },
    });
  }

  async getGroupList (groupId: string) {
    const dbStudents = await this.studentRepository.findMany({
      groupId,
      state: State.APPROVED,
    }, undefined, undefined, [
      { lastName: 'asc' },
      { firstName: 'asc' },
      { middleName: 'asc' },
    ]);

    const students = [];

    for (const dbStudent of dbStudents) {
      students.push({
        lastName: dbStudent.lastName,
        firstName: dbStudent.firstName,
        middleName: dbStudent.middleName,
        email: dbStudent.user.email,
        contacts: await this.userService.getContacts(dbStudent.userId),
      });
    }

    return this.fileService.generateGroupList(students, groupId);
  }

  async leaveGroup (groupId: string, studentId: string): Promise<DbStudent> {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();

    const student = await this.studentRepository.findOne({ userId: studentId });
    if (student.state !== State.APPROVED) throw new NotApprovedException();

    const captain = await this.getCaptain(groupId);
    if (captain.id === studentId) throw new NoPermissionException();

    await this.userService.deleteStudentSelectives(studentId);

    const { id } = await this.userService.getGroupRole(studentId);
    return this.studentRepository.updateById(studentId, {
      state: State.DECLINED,
      roles: {
        delete: {
          studentId_roleId: {
            roleId: id,
            studentId,
          },
        },
      },
    });
  }
}
