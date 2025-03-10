import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbTelegramGroup } from '../entities/DbTelegramGroup';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class TelegramGroupRepository extends PrismaRepository<'telegramGroup', DbTelegramGroup> {
  constructor (prisma: PrismaService) {
    super(prisma.telegramGroup, {
      group: true,
    });
  }
}
