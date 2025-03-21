import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbUser } from '../entities/user.entity';
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
