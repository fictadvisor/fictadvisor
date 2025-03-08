import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbContact } from '../entities/DbContact';

@Injectable()
export class ContactRepository extends PrismaRepository<'contact', DbContact> {
  constructor (prisma: PrismaService) {
    super(prisma.contact);
  }
}
