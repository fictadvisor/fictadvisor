import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { StudentRepository } from './StudentRepository';
import { UpdateSuperheroData } from './data/UpdateSuperheroData';
import { SuperheroRepository } from './SuperheroRepository';
import { UserRepository } from './UserRepository';
import { ContactRepository } from './ContactRepository';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { CreateContactDTO } from './dto/CreateContactDTO';
import { EntityType, Role, RoleName, State } from '@prisma/client';
import { UpdateContactDTO } from './dto/UpdateContactDTO';
import { CreateSuperheroDTO } from './dto/CreateSuperheroDTO';
import { StudentWithUserData } from './data/StudentDTOs';
import { AuthService } from '../auth/AuthService';
import { GroupRequestDTO } from './dto/GroupRequestDTO';
import { GroupService } from '../group/GroupService';
import { TelegramDTO } from '../auth/dto/TelegramDTO';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { UpdateStudentData } from './data/UpdateStudentData';

@Injectable()
export class UserService {
  constructor (
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private superheroRepository: SuperheroRepository,
    private contactRepository: ContactRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {
  }

  async createSuperhero (id: string, body: CreateSuperheroDTO) {
    return this.superheroRepository.createSuperhero(id, body);
  }

  async getSelective (studentId: string) {
    return this.studentRepository.getSelective(studentId);
  }

  async giveRole (id: string, { roleId }: GiveRoleDTO) {
    await this.studentRepository.addRole(id, roleId);
  }
  async getGroupByRole (id: string) {
    return await this.studentRepository.getGroupByRole(id);
  }

  async getGroupRoleDB (userId: string) {
    const roles = await this.studentRepository.getRoles(userId);
    const role = roles.find((r) => r.name === 'CAPTAIN' || r.name === 'MODERATOR' || r.name === 'STUDENT');
    const group = await this.getGroupByRole(role.id);
    return {
      ...role,
      groupId: group.id,
    };
  }

  getGroupRole (roles: { role: Role }[]) {
    const groupRole = roles.find((r) => r.role.name === 'CAPTAIN' || r.role.name === 'MODERATOR' || r.role.name === 'STUDENT');
    return groupRole?.role;
  }

  async removeRole (id: string, roleId: string) {
    await this.studentRepository.removeRole(id, roleId);
  }

  async updateStudent (userId: string, data: UpdateStudentData) {
    return this.studentRepository.update(userId, data);
  }

  async updateSuperhero (userId: string, data: UpdateSuperheroData) {
    return this.superheroRepository.updateSuperhero(userId, data);
  }

  async requestNewGroup (id: string, { groupId, isCaptain }: GroupRequestDTO) {
    const student = await this.studentRepository.get(id);
    if (student.state === State.APPROVED)
      throw new ForbiddenException();
    
    await this.studentRepository.update(id, { state: State.PENDING });
    const name = {
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
    };
    await this.authService.verify(student.user, { groupId, isCaptain, ...name });
  }

  async deleteUser (userId: string) {
    await this.userRepository.deleteRole(userId);
    await this.userRepository.delete(userId);
  }

  async updateUser (userId: string, data: UpdateUserDTO) {
    return this.userRepository.update(userId, data);
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
    await this.studentRepository.delete(userId);
  }

  getStudent (student: StudentWithUserData, hasGroup = true) {
    return {
      id: student.user.id,
      username: student.user.username,
      email: student.user.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      avatar: student.user.avatar,
      telegramId: student.user.telegramId,
      group: !hasGroup ? undefined : {
        ...student.group,
        state: student.state,
        role: this.getGroupRole(student.roles)?.name,
      },
    };
  }

  async addGroupRole (userId: string, isCaptain: boolean) {
    const roleName = isCaptain ? RoleName.CAPTAIN : RoleName.STUDENT;
    const { group } = await this.studentRepository.get(userId);
    await this.groupService.addGroupRole(group.id, userId, roleName);
  }

  async getUser (userId: string) {
    const student = await this.studentRepository.get(userId);

    return this.getStudent(student);
  }


  async linkTelegram (userId, telegram: TelegramDTO) {
    if (!this.authService.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }

    await this.userRepository.update(userId, { telegramId: telegram.id });
  }
}