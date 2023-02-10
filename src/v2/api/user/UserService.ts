import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { GroupService } from '../group/GroupService';
import { DisciplineService } from '../discipline/DisciplineService';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { StudentRepository } from './StudentRepository';
import { RoleService } from './role/RoleService';
import { UpdateSuperheroData } from "./dto/UpdateSuperheroData";
import { SuperheroRepository } from "./SuperheroRepository";
import { UserRepository } from "./UserRepository";
import { ContactRepository } from "./ContactRepository";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { CreateContactDTO } from "./dto/CreateContactDTO";
import { EntityType, State } from "@prisma/client";
import { UpdateContactDTO } from "./dto/UpdateContactDTO";
import { UpdateStudentDTO } from "./dto/UpdateStudentDTO";
import { CreateSuperheroDTO } from './dto/CreateSuperheroDTO';
import { AuthService } from '../auth/AuthService';
import { GroupRequestDTO } from './dto/GroupRequestDTO';

@Injectable()
export class UserService {
  constructor(
    private disciplineService: DisciplineService,
    @Inject(forwardRef(() => StudentRepository))
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleService: RoleService,
    private superheroRepository: SuperheroRepository,
    private contactRepository: ContactRepository,
    private authService: AuthService,
  ) {
  }

  async createSuperhero(id: string, body: CreateSuperheroDTO) {
    return this.superheroRepository.createSuperhero(id, body);
  }

  async getSelective(studentId: string) {
    return this.disciplineService.getSelective(studentId);
  }


  async hasPermission(userId: string, permission: string) {
    const roles = await this.studentRepository.getRoles(userId);
    for (const role of roles) {
      const hasRight = this.roleService.hasPermission(role.id, permission);
      if (hasRight) return true;
    }

    return false;
  }

  async giveRole(id: string, { roleId }: GiveRoleDTO) {
    await this.studentRepository.addRole(id, roleId);
  }
  async getGroupByRole(id: string) {
    return await this.studentRepository.getGroupByRole(id);
  }

  async getGroupRole(userId: string) {
    const roles = await this.studentRepository.getRoles(userId);
    const role = roles.find((r) => r.name == 'CAPTAIN' || r.name == 'MODERATOR' || r.name == 'STUDENT');
    const group = await this.getGroupByRole(role.id);
    return {
      ...role,
      groupId: group.id,
    };
  }

  async removeRole(id: string, roleId: string) {
    await this.studentRepository.removeRole(id, roleId);
  }

  async updateStudent(userId: string, data: UpdateStudentDTO) {
    await this.studentRepository.update(userId, data);
  }

  async updateSuperhero(userId: string, data: UpdateSuperheroData) {
    await this.superheroRepository.updateSuperhero(userId, data);
  }

  async requestNewGroup(id: string, {groupId, isCaptain}: GroupRequestDTO) {
    const user = await this.userRepository.get(id);
    if(user.state === State.APPROVED)
      throw new ForbiddenException();

    await this.studentRepository.update(id, {state: State.PENDING}); 
    const student = {
      firstName: user.student.firstName,
      middleName: user.student.middleName,
      lastName: user.student.lastName,
    }
    await this.authService.verify(user, {groupId, isCaptain, ...student})
  }

  async deleteUser(userId: string) {
    await this.userRepository.delete(userId);
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    await this.userRepository.update(userId, data);
  }

  async getContacts(userId: string) {
    await this.contactRepository.getAllContacts(userId);
  }

  async createContact(userId: string, data: CreateContactDTO) {
    await this.contactRepository.createContact({
      entityId: userId,
      entityType: EntityType.STUDENT,
      ...data,
    });
  }

  async updateContact(userId: string, name: string, data: UpdateContactDTO) {
    await this.contactRepository.updateContact(userId, name, data);
  }

  async deleteContact(userId: string, name: string) {
    await this.contactRepository.deleteContact(userId, name);
  }

  async deleteStudent(userId: string) {
    await this.studentRepository.delete(userId);
  }

  async getUserForTelegram(userId: string) {
    await this.userRepository.get(userId);
  }

  async getUser(userId: string) {
    const { id, username, email, avatar, telegramId,
      student: { firstName, lastName, middleName },
    } = await this.userRepository.get(userId);
    return {
      id,
      username,
      email,
      firstName,
      lastName,
      middleName,
      avatar,
      telegramId,
    };
  }
}