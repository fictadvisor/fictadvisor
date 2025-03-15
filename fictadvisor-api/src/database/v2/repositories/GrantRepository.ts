import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbGrant } from '../entities/DbGrant';

@Injectable()
export class GrantRepository extends PrismaRepository <'grant', DbGrant> {
  constructor (prisma: PrismaService) {
    super(prisma.grant);
  }
}
