import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { DbGrant } from '../entities/grant.entity';

@Injectable()
export class GrantRepository extends PrismaRepository <'grant', DbGrant> {
  constructor (prisma: PrismaService) {
    super(prisma.grant);
  }
}
