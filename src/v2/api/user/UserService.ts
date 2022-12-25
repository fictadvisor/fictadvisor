import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { State } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async verify(userId: string) {
    await this.prisma.student.update({
      where: {
        userId
      },
      data: {
        state: State.APPROVED
      }
    })
  }
}