import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GroupService } from '../group/GroupService';
import { DisciplineService } from '../discipline/DisciplineService';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { GrantRepository } from './grant/GrantRepository';
import { StudentRepository } from './StudentRepository';
import { RoleService } from './role/RoleService';
import { UpdateSuperheroData } from "./dto/UpdateSuperheroData";
import { SuperheroRepository } from "./SuperheroRepository";
import { UserRepository } from "./UserRepository";
import { ContactRepository } from "./ContactRepository";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { CreateContactDTO } from "./dto/CreateContactDTO";
import { EntityType } from "@prisma/client";
import { UpdateContactDTO } from "./dto/UpdateContactDTO";
import { UpdateStudentDTO } from "./dto/UpdateStudentDTO";

@Injectable()
export class UserService {
  constructor(
    private disciplineService: DisciplineService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    private prisma: PrismaService,
    private grantRepository: GrantRepository,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleService: RoleService,
    private superheroRepository: SuperheroRepository,
    private contactRepository: ContactRepository,
  ) {
  }

  async createSuperhero(id, body) {
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

  async updateContact(userId, name, data: UpdateContactDTO) {
    await this.contactRepository.updateContact(userId, name, data);
  }

  async deleteContact(userId, name) {
    await this.contactRepository.deleteContact(userId, name);
  }

  async deleteStudent(userId) {
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