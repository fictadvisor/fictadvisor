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
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    private studentMapper: StudentMapper,
  ) {
  }

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

  async giveRole (studentId: string, roleId: string) {
    await this.studentRepository.updateById(studentId, {
      roles: {
        create: {
          roleId,
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

  async getRoles (studentId: string) {
    return this.roleRepository.findMany({
      where: {
        userRoles: {
          some: {
            studentId,
          },
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
    const user = await this.userRepository.updateById(userId, data);
    return user;
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
    return this.studentMapper.getStudent(student);
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
    }

    return this.updateStudent(userId, { state });
  }
}