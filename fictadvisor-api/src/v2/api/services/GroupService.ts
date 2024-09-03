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
} from '@fictadvisor/utils/requests';
import { OrderQAParam, SortQAGroupsParam, SortQGSParam } from '@fictadvisor/utils/enums';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { DbGroup } from '../../database/entities/DbGroup';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { StudentMapper } from '../../mappers/StudentMapper';
import { UserService } from './UserService';
import { DateService } from '../../utils/date/DateService';
import { FileService } from '../../utils/files/FileService';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { UserRepository } from '../../database/repositories/UserRepository';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { StudentIsAlreadyCaptainException } from '../../utils/exceptions/StudentIsAlreadyCaptainException';
import { NotApprovedException } from '../../utils/exceptions/NotApprovedException';
import { AVATARS } from './AuthService';
import { Prisma, RoleName, State, User } from '@prisma/client';

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
    private disciplineMapper: DisciplineMapper,
    private groupRepository: GroupRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private disciplineRepository: DisciplineRepository,
    private studentMapper: StudentMapper,
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

  async getAll (query: QueryAllGroupsDTO) {
    if (query.sort === SortQAGroupsParam.CAPTAIN) {
      return this.getAllByCaptain(query);
    }

    const data: Prisma.GroupFindManyArgs = {
      where: {
        AND: [
          this.GroupSearching.code(query.search),
          this.GroupSearching.specialities(query.specialities),
          this.GroupSearching.cathedras(query.cathedras),
          this.GroupSearching.courses(query.courses),
        ],
      },
      orderBy: this.getGroupSorting(query),
    };
    return DatabaseUtils.paginate(this.groupRepository, query, data);
  }

  private getAllByCaptain (query: QueryAllGroupsDTO) {
    const data: Prisma.StudentFindManyArgs = {
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

    return DatabaseUtils.paginate(this.studentRepository, query, data);
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
      courseDate.setMonth(courseDate.getMonth()+4);
      const courseYear = courseDate.getFullYear();

      return {
        admissionYear: {
          in: courses?.map((course) => courseYear-course),
        },
      };
    },
  };

  private getGroupSorting ({ sort, order }: SortDTO) {
    order = order ?? 'asc';

    if (sort === SortQAGroupsParam.CODE) return { code: order };
    if (sort === SortQAGroupsParam.ADMISSION) return { admissionYear: order };
    return { code: order };
  }

  async get (id: string) {
    return this.groupRepository.findById(id);
  }

  async getDisciplineTeachers (groupId: string, { year, semester }: QuerySemesterDTO) {
    this.dateService.checkYearAndSemester(year, semester);
    const disciplines = await this.disciplineRepository.findMany({
      where: {
        groupId,
        semester,
        year,
      },
    });
    return this.disciplineMapper.getDisciplinesWithTeachers(disciplines);
  }

  async getDisciplines (groupId: string, { year, semester }: QuerySemesterDTO) {
    this.dateService.checkYearAndSemester(year, semester);
    const disciplines = await this.disciplineRepository.findMany({
      where: {
        groupId,
        semester,
        year,
      },
    });
    return this.disciplineMapper.getDisciplines(disciplines);
  }

  getSelectiveDisciplines (groupId: string) {
    return this.disciplineRepository.findMany({
      where: {
        groupId,
        isSelective: true,
      },
    });
  }

  async addUnregistered (groupId: string, body: EmailDTO) {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.find({ email });
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
      users.push({
        id: user.id,
        email: user.email,
      });
    }
    return { users };
  }

  async verifyStudent (groupId: string, userId: string, data: ApproveDTO) {
    const verifiedStudent = await this.studentRepository.updateById(userId, { state: data.state });

    if (data.state === State.APPROVED) {
      await this.addGroupRole(groupId, userId, RoleName.STUDENT);
      await this.userService.putSelective(userId);
    }

    return verifiedStudent;
  }

  async addGroupRole (groupId: string, userId: string, name: RoleName) {
    const role = await this.roleRepository.find({
      groupRole: {
        groupId,
        role: {
          name,
        },
      },
    });
    await this.userService.giveRole(userId, role.id);
  }

  async removeStudent (groupId: string, userId: string, reqUser: User) {
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

    const user = await this.userRepository.findById(userId);
    if (!user.username) {
      await this.userRepository.deleteById(userId);
    }
    await this.studentRepository.updateById(userId, { state: State.DECLINED });
  }

  async getCaptain (groupId: string) {
    const captain = await this.studentRepository.find({
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

  async deleteGroup (groupId: string) {
    await this.roleRepository.deleteMany({ groupRole: { groupId } });
    await this.studentRepository.updateMany({
      group: {
        id: groupId,
      },
    }, {
      state: State.DECLINED,
    });
    return this.groupRepository.deleteById(groupId);
  }

  async getStudents (groupId: string, { sort, order }: GroupStudentsQueryDTO) {
    const orderBy: Prisma.StudentOrderByWithRelationInput[] = [];
    if (sort) {
      if (!order) order = OrderQAParam.ASC;
      orderBy.push({ [sort]: order });
      orderBy.push({ [SortQGSParam.LAST_NAME]: order });
      orderBy.push({ [SortQGSParam.FIRST_NAME]: order });
      orderBy.push({ [SortQGSParam.MIDDLE_NAME]: order });
    }

    const students = await this.studentRepository.findMany({
      where: {
        groupId,
        state: State.APPROVED,
      },
      orderBy,
    });
    return students.map((s) => this.studentMapper.getStudent(s));
  }

  async updateGroup (groupId: string, {
    code,
    eduProgramId,
    cathedraId,
    admissionYear,
    captainId,
    moderatorIds,
  }: UpdateGroupDTO) {
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

  async getUnverifiedStudents (groupId: string) {
    const students = await this.studentRepository.findMany({
      where: {
        groupId,
        state: State.PENDING,
      },
    });
    return students.map((s) => this.studentMapper.getStudent(s, false));
  }

  async addPermissions (groupId: string) {
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

  async switchCaptain (groupId: string, studentId: string) {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();
    const oldCaptain = await this.getCaptain(groupId);

    if (oldCaptain) {
      if (oldCaptain.id === studentId) throw new StudentIsAlreadyCaptainException();
      await this.userService.changeGroupRole(oldCaptain.id, RoleName.STUDENT);
    }

    await this.userService.changeGroupRole(studentId, RoleName.CAPTAIN);
    return this.userService.getUser(studentId);
  }

  async switchModerators (groupId: string, studentIds: string[]) {
    const students = await this.studentRepository.findMany({
      where: {
        groupId,
      },
    });

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

  private async isStudentInGroup (groupId: string, studentId: string) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new InvalidEntityIdException('User');
    return student.groupId === groupId;
  }

  async getGroupsWithTelegramGroups () {
    return this.groupRepository.findMany({
      where: {
        telegramGroups: {
          some: {},
        },
      },
    });
  }

  async getGroupList (groupId: string) {
    const dbStudents = await this.studentRepository.findMany({
      where: {
        groupId,
        state: State.APPROVED,
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' },
        { middleName: 'asc' },
      ],
    });

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

  async leaveGroup (groupId: string, studentId: string) {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();

    const student = await this.studentRepository.findById(studentId);
    if (student.state !== State.APPROVED) throw new NotApprovedException();

    const captain = await this.getCaptain(groupId);
    if (captain.id === studentId) throw new NoPermissionException();

    await this.userService.deleteStudentSelectives(studentId);

    const { id } = await this.userService.getGroupRole(studentId);
    const updatedStudent = await this.studentRepository.updateById(studentId, {
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
    return this.studentMapper.getStudent(updatedStudent);
  }
}
