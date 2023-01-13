import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { User } from '@prisma/client';
import { ApproveDTO } from './dto/ApproveDTO';
import { GroupService } from '../group/GroupService';
import { DisciplineService } from '../discipline/DisciplineService';

@Injectable()
export class UserService {
  constructor(
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
}