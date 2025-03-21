import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { DbContact } from '../entities/contact.entity';

@Injectable()
export class ContactRepository extends PrismaRepository<'contact', DbContact> {
  constructor (prisma: PrismaService) {
    super(prisma.contact);
  }
}
