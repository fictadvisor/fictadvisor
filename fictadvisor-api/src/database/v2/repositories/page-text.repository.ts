import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { DbPageText } from '../entities/page-text.entity';
import { Prisma } from '@prisma/client/fictadvisor';

@Injectable()
export class PageTextRepository extends PrismaRepository<'pageText', DbPageText> {
  constructor (private prisma: PrismaService) {
    super(prisma.pageText);
  }

  updateById (key: string, data: Prisma.PageTextUpdateInput): Promise<DbPageText> {
    return this.prisma.pageText.update({
      where: { key },
      data,
    });
  }

  deleteById (key: string): Promise<DbPageText> {
    return this.prisma.pageText.delete({
      where: { key },
    });
  }
}
