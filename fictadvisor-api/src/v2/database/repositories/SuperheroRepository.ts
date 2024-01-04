import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { UpdateSuperheroDTO } from '../../api/dtos/UpdateSuperheroDTO';

@Injectable()
export class SuperheroRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async updateSuperhero (userId: string, data: UpdateSuperheroDTO) {
    return this.prisma.superhero.update({
      where: {
        userId,
      },
      data,
      select: {
        userId: true,
        dorm: true,
        state: true,
      },
    });
  }

  async createSuperhero (id, body) {
    return this.prisma.superhero.create({
      data: {
        userId: id,
        ...body,
      },
    });
  }
}