import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { UpdateSuperheroData } from '../datas/UpdateSuperheroData';
import { SuperheroRepository } from '../../database/repositories/SuperheroRepository';
import { UserRepository } from '../../database/repositories/UserRepository';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { CreateContactDTO } from '../dtos/CreateContactDTO';
import { EntityType, RoleName, State } from '@prisma/client';
import { UpdateContactDTO } from '../dtos/UpdateContactDTO';
import { CreateSuperheroDTO } from '../dtos/CreateSuperheroDTO';
import { AuthService } from './AuthService';
import { GroupRequestDTO } from '../dtos/GroupRequestDTO';
import { GroupService } from './GroupService';
import { TelegramDTO } from '../dtos/TelegramDTO';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { UpdateStudentData } from '../datas/UpdateStudentData';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { StudentMapper } from '../../mappers/StudentMapper';
import { FileService } from '../../utils/files/FileService';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { RemainingSelectiveDTO } from '../dtos/RemainingSelectiveDTO';
import { DateService } from '../../utils/date/DateService';
import { AttachSelectiveDisciplinesDTO } from '../dtos/AttachSelectiveDisciplinesDTO';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { NotBelongToGroupException } from '../../utils/exceptions/NotBelongToGroupException';
import { ExcessiveSelectiveDisciplinesException } from '../../utils/exceptions/ExcessiveSelectiveDisciplinesException';
import { checkIfArrayIsUnique } from '../../utils/ArrayUtil';
import { AlreadySelectedException } from '../../utils/exceptions/AlreadySelectedException';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { TelegramAPI } from '../../telegram/TelegramAPI';

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
    private superheroRepository: SuperheroRepository,
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
  ) {}

  async createSuperhero (id: string, body: CreateSuperheroDTO) {
    return this.superheroRepository.createSuperhero(id, body);
  }

  async getSelective (studentId: string) {
    return this.disciplineRepository.findMany({
      where: {
        selectiveDisciplines: {
          some: {
            studentId,
          },
        },
      },
    });
  }

  async getSelectiveBySemesters (userId: string) {
    const selectiveByUser = await this.getSelective(userId);
    const { selectiveAmounts } = await this.groupRepository.find({
      students: {
        some: {
          userId,
        },
      },
    });
    return this.disciplineMapper.getSelectiveWithAmount(selectiveByUser, selectiveAmounts);
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
    return await this.groupRepository.find({
      groupRoles: {
        some: {
          roleId,
        },
      },
    });
  }

  async getGroupRole (studentId: string) {
    return this.roleRepository.find({
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

  async changeGroup (studentId: string, groupId: string) {
    const prevRole = await this.getGroupRole(studentId);
    const nextRole = await this.roleRepository.find({
      name: prevRole.name,
      groupRole: {
        groupId,
      },
    });
    return this.studentRepository.updateById(studentId, {
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
  }

  async updateStudent (userId: string, data: UpdateStudentData) {
    const student = await this.studentRepository.updateById(userId, data);
    return this.studentMapper.updateStudent(student);
  }

  async updateSuperhero (userId: string, data: UpdateSuperheroData) {
    return this.superheroRepository.updateSuperhero(userId, data);
  }

  async requestNewGroup (id: string, { groupId, isCaptain }: GroupRequestDTO) {
    const student = await this.studentRepository.findById(id);
    if (student.state === State.APPROVED) {
      throw new ForbiddenException();
    }

    const captain = await this.groupService.getCaptain(groupId);

    if (captain && isCaptain) {
      throw new AlreadyRegisteredException();
    }

    await this.studentRepository.updateById(id, {
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
    await this.roleRepository.deleteMany({
      name: RoleName.USER,
      userRoles: {
        some: {
          studentId,
        },
      },
    });
    await this.userRepository.deleteById(studentId);
  }

  async updateUser (userId: string, data: UpdateUserDTO) {
    return this.userRepository.updateById(userId, data);
  }

  async getContacts (userId: string) {
    return this.contactRepository.getAllContacts(userId);
  }

  async createContact (userId: string, data: CreateContactDTO) {
    return this.contactRepository.createContact({
      entityId: userId,
      entityType: EntityType.STUDENT,
      ...data,
    });
  }

  async updateContact (userId: string, name: string, data: UpdateContactDTO) {
    await this.contactRepository.updateContact(userId, name, data);
    return this.contactRepository.getContact(userId, name);
  }

  async deleteContact (userId: string, name: string) {
    await this.contactRepository.deleteContact(userId, name);
  }

  async deleteStudent (userId: string) {
    await this.studentRepository.deleteById(userId);
  }

  async addGroupRole (userId: string, isCaptain: boolean) {
    const roleName = isCaptain ? RoleName.CAPTAIN : RoleName.STUDENT;
    const { group } = await this.studentRepository.findById(userId);
    await this.groupService.addGroupRole(group.id, userId, roleName);
  }

  async getUser (userId: string) {
    const student = await this.studentRepository.findById(userId);

    if (!student) {
      const caller = new Error().stack.split('\n')[2].trim();
      console.log(userId, caller);
    }

    return this.studentMapper.getStudent(student);
  }

  async getUserByTelegramId (telegramId: bigint) {
    return await this.studentRepository.find({
      user: {
        telegramId,
      },
    });
  }

  async linkTelegram (userId, telegram: TelegramDTO) {
    if (!this.authService.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }
    await this.userRepository.updateById(userId, { telegramId: telegram.id });
  }

  async verifyStudent (userId: string, isCaptain: boolean, state: State) {
    const user = await this.userRepository.findById(userId);
    if (user.student.state !== State.PENDING) return this.studentRepository.findById(userId);

    if (state === State.APPROVED) {
      if (isCaptain) {
        const captain = await this.groupService.getCaptain(user.student.group.id);

        if (captain) {
          throw new AlreadyRegisteredException();
        }
      }
      await this.addGroupRole(userId, isCaptain);
      await this.putSelective(userId);
    }

    return this.updateStudent(userId, { state });
  }

  async putSelective (studentId: string) {
    const { firstName, lastName, group: { code } } = await this.studentRepository.findById(studentId);
    const name = `${lastName} ${firstName}`;
    const years = await this.dateService.getYears();
    for (const year of years) {
      const selectiveFile = this.fileService.getFileContent(`selective/${year}.csv`);
      for (const parsedRow of selectiveFile.split(/\r\n/g)) {
        const [,, subjectName,, semester,,,,, studentName] = parsedRow.split(';');
        if (!studentName?.startsWith(name)) continue;
        const discipline = await this.disciplineRepository.find({
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
          await this.telegramAPI.sendMessage(`Selective discipline is not found: group: ${code}; fullName: ${name}; subject: ${subjectName}`);
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
    const path = await this.fileService.saveByHash(file, 'avatars');

    return this.userRepository.updateById(userId, {
      avatar: path,
    });
  }

  async getRemainingSelective (userId, body: RemainingSelectiveDTO) {
    const user = await this.getUser(userId);
    const group = await this.groupService.get(user.group.id);

    const selective = await this.getSelective(user.id);
    const semesterSelective = selective.filter((x) => x.year === body.year && x.semester === body.semester);

    const { semesters } = await this.dateService.getAllPreviousSemesters();
    if (!semesters.some((s) => s.year === body.year && s.semester === body.semester)) {
      return {};
    }

    const semesterAmount = group.selectiveAmounts.find((x) => x.semester === body.semester && x.year === body.year);
    const availableSelectiveAmount = semesterAmount.amount - semesterSelective.length;

    if (availableSelectiveAmount <= 0) {
      return {};
    }

    const disciplines = (await this.disciplineRepository.findMany({
      where: {
        semester: body.semester,
        year: body.year,
        isSelective: true,
        groupId: group.id,
      },
    })).map(({ id, subject: { name } }) => ({ disciplineId: id, subjectName: name }));

    const remainingSelective = disciplines.filter((selectiveDisc) =>
      !semesterSelective.some((requiredSemeDisc) => requiredSemeDisc.id === selectiveDisc.disciplineId));

    return {
      ...body,
      availableSelectiveAmount,
      remainingSelective,
    };
  }

  private checkIsEachDisciplineBelongUserGroup (
    disciplines: DbDiscipline[],
    groupId: string
  ) {
    disciplines.map((discipline) => {
      if (discipline.groupId !== groupId) {
        throw new NotBelongToGroupException();
      }
    });
  }

  async getSelectiveDisciplines (userId: string) {
    return this.disciplineRepository.findMany({
      where: {
        selectiveDisciplines: {
          some: {
            studentId: userId,
          },
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
      const { selectiveAmounts } = await this.groupRepository.find({
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

  private checkAlreadySelectedDisciplines (disciplineIds, selectedDisciplineIds) {
    const isUnique = checkIfArrayIsUnique([...disciplineIds, ...selectedDisciplineIds]);
    if (!isUnique) {
      throw new AlreadySelectedException();
    }
  }

  private async attachSelectiveDisciplines (
    userId: string,
    disciplineIds: string[]
  ) {
    await this.studentRepository.update({
      where: {
        userId: userId,
      },
      data: {
        selectiveDisciplines: {
          createMany: {
            data: disciplineIds.map((disciplineId) => ({ disciplineId })),
          },
        },
      },
    });
  }

  async selectDisciplines (
    userId: string,
    body: AttachSelectiveDisciplinesDTO,
  ) {
    const disciplines = [];
    for (const disciplineId of body.disciplines) {
      disciplines.push(await this.disciplineRepository.findById(disciplineId));
    }
    const { id: groupId } = await this.groupRepository.find({
      students: {
        some: {
          userId: userId,
        },
      },
    });
    this.checkIsEachDisciplineBelongUserGroup(disciplines, groupId);

    const sortedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(disciplines);
    const selectedDisciplines = await this.getSelectiveDisciplines(userId);
    const sortedSelectedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(selectedDisciplines);

    this.checkAlreadySelectedDisciplines(body.disciplines, selectedDisciplines.map((d) => d.id));
    await this.checkExcessiveSelectiveDisciplines(sortedDisciplines, sortedSelectedDisciplines, groupId);
    await this.attachSelectiveDisciplines(userId, body.disciplines);
  }

  async transferRole (captainId : string, studentId: string) {
    const group = await this.groupRepository.find({
      AND: [
        {
          students: {
            some: {
              userId: captainId,
            },
          },
        },
        {
          students: {
            some: {
              userId: studentId,
            },
          },
        },
      ],
    });

    if (!group) {
      throw new NoPermissionException();
    }

    const newStudentUserRole = await this.roleRepository.find({
      groupRole: {
        groupId: group.id,
      },
      userRoles: {
        some: {
          studentId: captainId,
        },
      },
    });

    const oldStudentUserRole = await this.roleRepository.find({
      groupRole: {
        groupId: group.id,
      },
      userRoles: {
        some: {
          studentId,
        },
      },
    });

    await this.roleRepository.updateById(newStudentUserRole.id, {
      userRoles: {
        updateMany: {
          where: {
            studentId: captainId,
          },
          data: {
            studentId,
          },
        },
      },
    });

    await this.roleRepository.updateById(oldStudentUserRole.id, {
      userRoles: {
        updateMany: {
          where: {
            studentId,
          },
          data: {
            studentId: captainId,
          },
        },
      },
    });
  }
}