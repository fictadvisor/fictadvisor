import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/PrismaService';
import {GroupService} from '../group/GroupService';
import {DisciplineService} from '../discipline/DisciplineService';
import {GiveRoleDTO} from './dto/GiveRoleDTO';
import {GrantRepository} from './grant/GrantRepository';
import {StudentRepository} from './StudentRepository';
import {RoleService} from './role/RoleService';
import {UpdateStudentData} from "./dto/UpdateStudentData";
import {UpdateSuperheroData} from "./dto/UpdateSuperheroData";
import {SuperheroRepository} from "./SuperheroRepository";

@Injectable()
export class UserService {
  constructor(
    private disciplineService: DisciplineService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    private prisma: PrismaService,
    private grantRepository: GrantRepository,
    private studentRepository: StudentRepository,
    private roleService: RoleService,
    private superheroRepository: SuperheroRepository,
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

  async giveRole(id: string, {roleId}: GiveRoleDTO) {
    await this.studentRepository.addRole(id, roleId);
  }

  async removeRole(id: string, roleId: string) {
    await this.studentRepository.removeRole(id, roleId);
  }

  async updateStudent(userId: string, data: UpdateStudentData) {
    await this.studentRepository.updateStudent(userId, data);
  }

  async updateSuperhero(userId: string, data: UpdateSuperheroData) {
    await this.superheroRepository.updateSuperhero(userId, data);
  }
}