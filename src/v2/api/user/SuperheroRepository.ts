import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/PrismaService';
import {UpdateSuperheroData} from "./dto/UpdateSuperheroData";

@Injectable()
export class SuperheroRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async updateSuperhero(userId: string, data: UpdateSuperheroData) {
    await this.prisma.superhero.update({
      where: {
        userId,
      },
      data,
    });
  }

  async createSuperhero(id, body) {
    await this.prisma.superhero.create({
      data: {
        userId: id,
        ...body,
      },
    });
  }
}