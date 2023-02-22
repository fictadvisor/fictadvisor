import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateSuperheroData } from './dto/UpdateSuperheroData';

@Injectable()
export class SuperheroRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async updateSuperhero (userId: string, data: UpdateSuperheroData) {
    return this.prisma.superhero.update({
      where: {
        userId,
      },
      data,
      select: {
        userId: true,
        dorm: true,
      },
    });
  }

  async createSuperhero (id, body) {
    await this.prisma.superhero.create({
      data: {
        userId: id,
        ...body,
      },
    });
  }
}