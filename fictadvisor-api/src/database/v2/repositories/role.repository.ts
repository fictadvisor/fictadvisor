import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbRole } from '../entities/role.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class RoleRepository extends PrismaRepository<'role', DbRole> {
  constructor (prisma: PrismaService) {
    super(prisma.role, { grants: true });
  }
}
