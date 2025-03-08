import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { PrismaService } from '../PrismaService';
import { DbCathedra } from '../entities/DbCathedra';

@Injectable()
export class CathedraRepository extends PrismaRepository<'cathedra', DbCathedra> {
  constructor (prisma: PrismaService) {
    super(prisma.cathedra, {
      teachers: {
        include: {
          teacher: true,
        },
      },
    });
  }
}
