import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { PrismaService } from '../prisma.service';
import { DbCathedra } from '../entities/cathedra.entity';

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
