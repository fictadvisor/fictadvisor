import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  UpdateUserDTO,
  CreateContactDTO,
  UpdateContactDTO,
  GroupRequestDTO,
  TelegramDTO,
  RemainingSelectivesDTO,
  SelectiveDisciplinesDTO,
  CreateUserDTO,
  QueryAllUsersDTO,
  UpdateStudentDTO,
} from '@fictadvisor/utils/requests';
import { RemainingSelectivesResponse } from '@fictadvisor/utils/responses';
import { isArrayUnique } from '../../../common/utils/array.utils';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { TelegramAPI } from '../../telegram-api/telegram-api';
import { StudentMapper } from '../../../common/mappers/student.mapper';
import { DisciplineMapper } from '../../../common/mappers/discipline.mapper';
import { AuthService, AVATARS } from '../../auth/v2/auth.service';
import { GroupService } from '../../group/v2/group.service';
import { FileService } from '../../file/file.service';
import { PollService } from '../../poll/v2/poll.service';
import { DisciplineTeacherService } from '../../teacher/v2/discipline-teacher.service';
import { DateService } from '../../date/v2/date.service';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DbUser } from '../../../database/v2/entities/user.entity';
import { DbStudent } from '../../../database/v2/entities/student.entity';
import { StudentRepository } from '../../../database/v2/repositories/student.repository';
import { UserRepository } from '../../../database/v2/repositories/user.repository';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { ContactRepository } from '../../../database/v2/repositories/contact.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import { InvalidTelegramCredentialsException } from '../../../common/exceptions/invalid-telegram-credentials.exception';
import { AlreadyRegisteredException } from '../../../common/exceptions/already-registered.exception';
import { NotBelongException } from '../../../common/exceptions/not-belong.exception';
import { ExcessiveSelectiveDisciplinesException } from '../../../common/exceptions/excessive-selective-disciplines.exception';
import { AlreadySelectedException } from '../../../common/exceptions/already-selected.exception';
import { DuplicateTelegramIdException } from '../../../common/exceptions/duplicate-telegram-id.exception';
import { NotSelectedDisciplineException } from '../../../common/exceptions/not-selected-discipline.exception';
import { AlreadySentGroupRequestException } from '../../../common/exceptions/already-sent-group-request.exception';
import { EntityType, RoleName, State } from '@prisma/client/fictadvisor';
import { AbsenceOfCaptainException } from '../../../common/exceptions/absence-of-captain.exception';
import { CaptainAlreadyRegisteredException } from '../../../common/exceptions/captain-already-registered.exception';

type SortedDisciplines = {
  year: number;
  semester: number;
  disciplines: string[];
}

@Injectable()
export class UserService {
  constructor (
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private contactRepository: ContactRepository,
    private roleRepository: RoleRepository,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private fileService: FileService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    private studentMapper: StudentMapper,
    private disciplineMapper: DisciplineMapper,
    private dateService: DateService,
    private telegramAPI: TelegramAPI,
    private disciplineTeacherService: DisciplineTeacherService,
    private pollService: PollService,
  ) {}

  async createUserByAdmin (data: CreateUserDTO) {
    if (await this.authService.checkIfUserIsRegistered(data)) {
      throw new AlreadyRegisteredException();
    }
    return this.userRepository.create(data);
  }

  async getSelectivesBySemesters (userId: string) {
    const selectiveByUser = await this.getSelectiveDisciplines(userId);
    const group = await this.groupRepository.findOne({
      students: {
        some: {
          userId,
        },
      },
    });
    return this.disciplineMapper.getSelectivesBySemesters(selectiveByUser, group?.selectiveAmounts ?? []);
  }

  async giveRole (studentId: string, roleId: string) {
    await this.studentRepository.updateById(studentId, {
      roles: {
        connectOrCreate: {
          where: {
            studentId_roleId: {
              studentId,
              roleId,
            },
          },
          create: {
            roleId,
          },
        },
      },
    });
  }

  async getGroupByRole (roleId: string) {
    return await this.groupRepository.findOne({
      groupRoles: {
        some: {
          roleId,
        },
      },
    });
  }

  async getGroupRole (studentId: string) {
    return this.roleRepository.findOne({
      userRoles: {
        some: {
          studentId,
        },
      },
      name: {
        in: [RoleName.CAPTAIN, RoleName.MODERATOR, RoleName.STUDENT],
      },
    });
  }

  async getGroupRoleDB (studentId: string) {
    const role = await this.getGroupRole(studentId);
    const group = await this.getGroupByRole(role.id);
    return {
      ...role,
      groupId: group.id,
    };
  }

  async removeRole (studentId: string, roleId: string) {
    await this.studentRepository.updateById(studentId, {
      roles: {
        delete: {
          studentId_roleId: {
            roleId,
            studentId,
          },
        },
      },
    });
  }

  async changeGroupRole (studentId: string, name: RoleName) {
    const userRole = await this.getGroupRoleDB(studentId);

    const { id: roleId } = await this.roleRepository.findOne({
      groupRole: {
        groupId: userRole.groupId,
      },
      name,
    });

    await this.studentRepository.updateById(studentId, {
      roles: {
        update: {
          where: {
            studentId_roleId: {
              roleId: userRole.id,
              studentId,
            },
          },
          data: { roleId },
        },
      },
    });
  }

  async changeGroup (studentId: string, groupId: string) {
    const prevRole = await this.getGroupRole(studentId);
    const nextRole = await this.roleRepository.findOne({
      name: RoleName.STUDENT,
      groupRole: {
        groupId,
      },
    });

    const studentSelective = await this.getSelectiveDisciplines(studentId);
    const newGroupSelective = await this.groupService.getSelectiveDisciplines(groupId);

    await this.deleteStudentSelectives(studentId);

    for (const discipline of studentSelective) {
      const exist = newGroupSelective.find((d) => d.subjectId === discipline.subjectId);

      if (!exist) {
        await this.createSelective(groupId, discipline);
      }
    }

    const result = await this.studentRepository.updateById(studentId, {
      groupId,
      roles: {
        delete: {
          studentId_roleId: {
            roleId: prevRole.id,
            studentId,
          },
        },
        create: {
          roleId: nextRole.id,
        },
      },
    });

    const { teachers } = await this.pollService.getDisciplineTeachers(studentId, {});

    for (const { disciplineTeacherId } of teachers) {
      await this.disciplineTeacherService.removeFromPoll(disciplineTeacherId, studentId);
    }

    return result;
  }

  async deleteStudentSelectives (studentId: string) {
    await this.studentRepository.updateById(studentId, {
      selectiveDisciplines: {
        deleteMany: {
          studentId,
        },
      },
    });
  }

  async createSelective (groupId: string, discipline: DbDiscipline) {
    await this.disciplineRepository.create({
      semester: discipline.semester,
      year: discipline.year,
      isSelective: true,
      subjectId: discipline.subjectId,
      groupId: groupId,
    });
  }

  async updateStudent (userId: string, data: UpdateStudentDTO) {
    const student = await this.studentRepository.updateById(userId, data);
    return this.studentMapper.updateStudent(student as unknown as DbStudent);
  }

  async requestNewGroup (userId: string, { groupId, isCaptain }: GroupRequestDTO) {
    const student = await this.studentRepository.findOne({ userId });

    switch (student.state) {
      case State.APPROVED: {
        throw new ForbiddenException();
      }
      case State.PENDING: {
        throw new AlreadySentGroupRequestException();
      }
    }

    const captain = await this.groupService.findCaptain(groupId);

    if (!captain && !isCaptain) {
      throw new AbsenceOfCaptainException();
    } else if (captain && isCaptain) {
      throw new CaptainAlreadyRegisteredException();
    }

    await this.studentRepository.updateById(userId, {
      state: State.PENDING,
      groupId,
    });
    const name = {
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
    };
    await this.authService.verify(student.user, { groupId, isCaptain, ...name });
  }

  async deleteUser (studentId: string) {
    await this.roleRepository.delete({
      name: RoleName.USER,
      userRoles: {
        some: {
          studentId,
        },
      },
    });
    await this.userRepository.deleteById(studentId);
  }

  async updateUser (id: string, data: UpdateUserDTO) {
    return this.userRepository.updateById(id, data);
  }

  async getContacts (userId: string) {
    return this.contactRepository.findMany({ entityId: userId });
  }

  async createContact (userId: string, data: CreateContactDTO) {
    return this.contactRepository.create({
      entityId: userId,
      entityType: EntityType.STUDENT,
      ...data,
    });
  }

  async updateContact (id: string, data: UpdateContactDTO) {
    await this.contactRepository.updateById(id, data);
    return this.contactRepository.findOne({ id });
  }

  async deleteContact (id: string) {
    await this.contactRepository.deleteById(id);
  }

  async addGroupRole (userId: string, isCaptain: boolean) {
    const roleName = isCaptain ? RoleName.CAPTAIN : RoleName.STUDENT;
    const { group } = await this.studentRepository.findOne({ userId });
    await this.groupService.addGroupRole(group.id, userId, roleName);
  }

  async getUser (userId: string) {
    const student = await this.studentRepository.findOne({ userId });
    if (student) return this.studentMapper.getOrdinaryStudent(student, !!student.group);
  }

  async getSimplifiedUser (userId: string) {
    return this.userRepository.findOne({ id: userId });
  }

  async getUserByTelegramId (telegramId: bigint) {
    return this.studentRepository.findOne({
      user: {
        telegramId,
      },
    });
  }

  async linkTelegram (userId: string, telegram: TelegramDTO) {
    if (!this.authService.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }

    const userWithTelegramId = await this.userRepository.findOne({ telegramId: telegram.id });

    if (userWithTelegramId) {
      throw new DuplicateTelegramIdException();
    }
    await this.userRepository.updateById(userId, { telegramId: telegram.id });

  }

  async verifyStudent (userId: string, isCaptain: boolean, state: State) {
    const user = await this.userRepository.findOne({ id: userId });
    if (user.student.state !== State.PENDING) return this.studentRepository.findOne({ userId });

    if (state === State.APPROVED) {
      if (isCaptain) {
        const captain = await this.groupService.findCaptain(user.student.group.id);

        if (captain) {
          throw new AlreadyRegisteredException();
        }
      }
      await this.addGroupRole(userId, isCaptain);
      await this.putSelective(userId);
    }

    return this.updateStudent(userId, { state } as UpdateStudentDTO);
  }

  async putSelective (studentId: string) {
    const { firstName, lastName, group: { code } } = await this.studentRepository.findOne({ userId: studentId });
    const name = `${lastName} ${firstName}`;
    const years = await this.dateService.getYears();
    const missingDisciplines = [];
    for (const year of years) {
      const selectiveFile = await this.fileService.getFileContent(`selective/${year}.csv`);
      selectiveFile.replaceAll(';', ',');
      for (const parsedRow of selectiveFile.split('\n')) {
        const [, , subjectName, , semester, , , , , studentName] = parsedRow.split(',');
        if (!studentName?.startsWith(name)) continue;
        const discipline = await this.disciplineRepository.findOne({
          group: {
            code,
          },
          subject: {
            name: subjectName,
          },
          year,
          semester: +semester % 2 === 0 ? 2 : 1,
          isSelective: true,
        });

        if (!discipline) {
          missingDisciplines.push(subjectName);
          continue;
        }

        await this.studentRepository.updateById(studentId, {
          selectiveDisciplines: {
            connectOrCreate: {
              where: {
                disciplineId_studentId: {
                  disciplineId: discipline.id,
                  studentId,
                },
              },
              create: {
                disciplineId: discipline.id,
              },
            },
          },
        });
      }
    }
  }

  async updateAvatar (file: Express.Multer.File, userId: string) {
    const { avatar } = await this.userRepository.findOne({ id: userId });

    if (avatar.includes('storage.googleapis.com')) {
      const oldPath = this.fileService.getPathFromLink(avatar);
      await this.deleteAvatarIfNotUsed(avatar, oldPath);
    }

    const path = await this.fileService.saveByHash(file, 'avatars');

    return this.userRepository.updateById(userId, {
      avatar: path,
    });
  }

  async deleteAvatar (userId: string) {
    const { avatar } = await this.userRepository.findOne({ id: userId });

    if (avatar.includes('storage.googleapis.com')) {
      const oldPath = this.fileService.getPathFromLink(avatar);
      await this.deleteAvatarIfNotUsed(avatar, oldPath);
    }

    return this.userRepository.updateById(userId, {
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    });
  }

  private async deleteAvatarIfNotUsed (avatar: string, oldPath: string) {
    const exist = await this.fileService.checkFileExist(oldPath);
    if (exist) {
      const users = await this.userRepository.findMany({  avatar });
      if (users.length === 1) {
        await this.fileService.deleteFile(oldPath);
      }
    }
  }

  async getRemainingSelectivesForSemester (userId: string, query: RemainingSelectivesDTO) {
    const semester = await this.dateService.getSemester({ year: query.year, semester: query.semester });
    if (!semester) {
      return {};
    }

    const remainingSelectives = await this.getRemainingSelectives(userId);
    const result = remainingSelectives.find(({ year, semester }) => year === query.year && semester === query.semester);
    return result.availableSelectiveAmount > 0 ? result : {};
  }

  async getRemainingSelectives (userId: string): Promise<RemainingSelectivesResponse[]> {
    const user = await this.getUser(userId);
    const group = await this.groupService.get(user.group.id);

    const selective = await this.getSelectiveDisciplines(user.id);

    const disciplines = await this.disciplineRepository.findMany({
      isSelective: true,
      groupId: group.id,
      id: {
        notIn: selective.map((s) => s.id),
      },
    });

    const semesters = this.getUniqueSemesters(disciplines);
    const result: RemainingSelectivesResponse[] = [];

    semesters.forEach((s) => {
      const semesterAmount = group.selectiveAmounts.find((x) => x.semester === s.semester && x.year === s.year);

      const userSemesterSelectives = selective.filter(({
        year,
        semester,
      }) => year === s.year && semester === s.semester);
      const availableSelectiveAmount = semesterAmount ?
        semesterAmount.amount - userSemesterSelectives.length : 0;

      const remainingSelectives = disciplines
        .filter((selectiveDisc) => selectiveDisc.year === s.year && selectiveDisc.semester === s.semester)
        .map(({ id, subject: { name } }) => ({
          disciplineId: id,
          subjectName: name,
        }));

      result.push({
        ...s,
        availableSelectiveAmount,
        remainingSelectives,
      });
    });

    return result;
  }

  getUniqueSemesters (selective: DbDiscipline[]) {
    const allSemesters = [];
    selective.forEach((discipline) => {
      if (!allSemesters.some(({ semester, year }) => semester === discipline.semester && year === discipline.year)) {
        allSemesters.push({ semester: discipline.semester, year: discipline.year });
      }
    });

    return allSemesters;
  }

  private async checkDisciplinesBelongToGroup (disciplineIds: string[], groupId: string) {
    for (const disciplineId of disciplineIds) {
      const discipline = await this.disciplineRepository.findOne({ id: disciplineId });
      if (discipline.groupId !== groupId) {
        throw new NotBelongException('discipline', 'group');
      }
    }
  }

  async getSelectiveDisciplines (userId: string) {
    return this.disciplineRepository.findMany({
      selectiveDisciplines: {
        some: {
          studentId: userId,
        },
      },
    });
  }

  private async checkExcessiveSelectiveDisciplines (
    pendingDisciplines: SortedDisciplines[],
    selectedDisciplines: SortedDisciplines[],
    groupId: string,
  ) {
    for (const { year, semester, disciplines } of pendingDisciplines) {
      const pendingAmount = disciplines.length;
      const selectedAmount = selectedDisciplines
        .find((p) => p.year === year && p.semester === semester)
        ?.disciplines.length ?? 0;
      const { selectiveAmounts } = await this.groupRepository.findOne({
        selectiveAmounts: {
          some: {
            groupId: groupId,
            year: year,
            semester: semester,
          },
        },
      });
      const { amount } = selectiveAmounts.find((s) => s.year === year && s.semester === semester);
      if (pendingAmount + selectedAmount > amount) {
        throw new ExcessiveSelectiveDisciplinesException();
      }
    }
  }

  private checkAlreadySelectedDisciplines (disciplineIds: string[], selectedDisciplineIds: string[]) {
    const isUnique = isArrayUnique([...disciplineIds, ...selectedDisciplineIds]);
    if (!isUnique) {
      throw new AlreadySelectedException();
    }
  }

  private checkNotSelectedDisciplines (disciplineIds: string[], selectedDisciplineIds: string[]) {
    const hasNotSelectedDisciplines = disciplineIds.some(
      (disciplineId) => !selectedDisciplineIds.includes(disciplineId),
    );

    if (hasNotSelectedDisciplines) {
      throw new NotSelectedDisciplineException();
    }
  }

  private async attachSelectiveDisciplines (userId: string, disciplineIds: string[]) {
    await this.studentRepository.updateById(userId, {
      selectiveDisciplines: {
        createMany: {
          data: disciplineIds.map((disciplineId) => ({ disciplineId })),
        },
      },
    });
  }

  private async detachSelectiveDisciplines (userId: string, disciplineIds: string[]) {
    await this.studentRepository.updateById(userId, {
      selectiveDisciplines: {
        deleteMany: {
          disciplineId: {
            in: disciplineIds,
          },
        },
      },
    });
  }

  async selectDisciplines (userId: string, body: SelectiveDisciplinesDTO) {
    const disciplines = await this.disciplineRepository.findMany({
      id: {
        in: body.disciplines,
      },
    });
    const { id: groupId } = await this.groupRepository.findOne({
      students: {
        some: {
          userId: userId,
        },
      },
    });
    await this.checkDisciplinesBelongToGroup(disciplines.map((discipline) => discipline.id), groupId);

    const sortedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(disciplines);
    const selectedDisciplines = await this.getSelectiveDisciplines(userId);
    const sortedSelectedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(selectedDisciplines);

    this.checkAlreadySelectedDisciplines(body.disciplines, selectedDisciplines.map((d) => d.id));
    await this.checkExcessiveSelectiveDisciplines(sortedDisciplines, sortedSelectedDisciplines, groupId);
    await this.attachSelectiveDisciplines(userId, body.disciplines);
  }

  async deselectDisciplines (userId: string, body: SelectiveDisciplinesDTO) {
    const { id: groupId } = await this.groupRepository.findOne({
      students: {
        some: {
          userId: userId,
        },
      },
    });
    await this.checkDisciplinesBelongToGroup(body.disciplines, groupId);
    const selectedDisciplines = await this.getSelectiveDisciplines(userId);

    this.checkNotSelectedDisciplines(body.disciplines, selectedDisciplines.map((d) => d.id));
    await this.detachSelectiveDisciplines(userId, body.disciplines);
  }

  async getAll (query: QueryAllUsersDTO) {
    const search = DatabaseUtils.getSearch(query, 'username', 'email');
    const sort = DatabaseUtils.getSort(query, 'username');

    const data: PaginateArgs<'user'> = {
      where: {
        ...search,
        state: query.state?.length !== 0 ? {
          in: query.state,
        } : undefined,
      },
      ...sort,
    };
    return await PaginationUtil.paginate<'user', DbUser>(this.userRepository, query, data);
  }
}
