import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbSuperhero } from '../entities/DbSuperhero';

@Injectable()
export class SuperheroRepository extends PrismaRepository<'superhero', DbSuperhero> {
  constructor (prisma: PrismaService) {
    super(prisma.superhero);
  }
}
