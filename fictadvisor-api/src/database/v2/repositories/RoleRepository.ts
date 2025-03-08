import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbRole } from '../entities/DbRole';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class RoleRepository extends PrismaRepository<'role', DbRole> {
  constructor (prisma: PrismaService) {
    super(prisma.role, { grants: true });
  }
}
