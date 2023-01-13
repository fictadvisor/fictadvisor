import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { User } from '@prisma/client';
import { ApproveDTO } from './dto/ApproveDTO';
import { GroupService } from '../group/GroupService';
import { DisciplineService } from '../discipline/DisciplineService';

@Injectable()
export class UserService {
  constructor(
    private disciplineService: DisciplineService,
    private groupService: GroupService,
    private prisma: PrismaService,
  ) {}

  async verify(userId: string, body: ApproveDTO) {
    await this.prisma.student.update({
      where: {
        userId,
      },
      data: {
        ...body,
      }
    })
  }

  async createSuperhero(id, body) {
    await this.prisma.superhero.create({
      data: {
        userId: id,
        ...body,
      }
    })
  }

  async verifySuperhero(userId: string, body: ApproveDTO) {
    await this.prisma.superhero.update({
      where: {
        userId,
      },
      data: {
        ...body,
      }
    })
  }

  async getSelective(studentId: string) {
    return this.disciplineService.getSelective(studentId);
  }


  async hasPermission(user: User, permission: string, scope: string) {
    const roles = await this.getRoles(user.id);
    for (const role of roles) {
      const grant = await this.getGrant(permission, scope, role.id);
      if (!grant) continue;
      return grant.set;
    }

    return false;
  }

  async getRoles(studentId: string) {
    const roles = await this.prisma.studentRole.findMany({
      where: {
        studentId,
      },
      include: {
        role: true,
      },
      orderBy: {
        role: {
          priority: 'desc',
        }
      }
    });

    return roles.map(role => role.role);
  }

  async getGrant(name, scope, roleId) {
    return this.prisma.grant.findFirst({
      where: {
        roleId,
        scope,
        permission: {
          name
        }
      }
    })
  }

  async createRole(body) {
    return this.prisma.userRole.create({
      data: body
    })
  }

}