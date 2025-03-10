import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbPageText } from '../entities/DbPageText';

@Injectable()
export class PageTextRepository extends PrismaRepository<'pageText', DbPageText> {
  constructor (prisma: PrismaService) {
    super(prisma.pageText);
  }
}
