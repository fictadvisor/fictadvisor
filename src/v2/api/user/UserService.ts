import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { ApproveDTO } from './dto/ApproveDTO';
import { GroupService } from '../group/GroupService';
import { DisciplineService } from '../discipline/DisciplineService';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { GrantRepository } from './grant/GrantRepository';
import { StudentRepository } from './StudentRepository';
import { RoleService } from './role/RoleService';

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
  ) {}

  async verify(userId: string, body: ApproveDTO) {
    await this.prisma.student.update({
      where: {
        userId,
      },
      data: {
        ...body,
      },
    });
  }

  async createSuperhero(id, body) {
    await this.prisma.superhero.create({
      data: {
        userId: id,
        ...body,
      },
    });
  }

  async verifySuperhero(userId: string, body: ApproveDTO) {
    await this.prisma.superhero.update({
      where: {
        userId,
      },
      data: {
        ...body,
      },
    });
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

  async removeRole(id: string, roleId: string) {
    await this.studentRepository.removeRole(id, roleId);
  }
}