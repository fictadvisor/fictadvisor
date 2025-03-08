import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbUser } from '../entities/DbUser';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class UserRepository extends PrismaRepository<'user', DbUser> {
  constructor (prisma: PrismaService) {
    super(prisma.user, {
      student: {
        include: {
          group: true,
        },
      },
    });
  }
}
