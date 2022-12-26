import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';

@Injectable()
export class DisciplineService {
  constructor(
    private prisma: PrismaService,
  ) {}


  async create(body: CreateDisciplineDTO) {
    return this.prisma.discipline.create({
      data: body
    })
  }
}