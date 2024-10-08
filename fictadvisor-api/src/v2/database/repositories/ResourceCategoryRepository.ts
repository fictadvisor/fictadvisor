import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class ResourceCategoryRepository {

  constructor (
    private prisma: PrismaService,
  ) {}

  async findById (id: string) {
    return this.prisma.resourceCategory.findUnique({
      where: { id },
    });
  }
}