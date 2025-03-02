import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getAllContacts (
    entityId: string
  ) {
    return this.prisma.contact.findMany({
      where: {
        entityId,
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        link: true,
      },
    });
  }

  async getContact (entityId: string, id: string) {
    return this.prisma.contact.findFirst({
      where: {
        id,
        entityId,
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        link: true,
      },
    });
  }

  async createContact (data: Prisma.ContactCreateInput) {
    return this.prisma.contact.create({
      data,
    });
  }

  async updateContact (
    entityId: string,
    id: string,
    data: Prisma.ContactUpdateInput,
  ) {
    return this.prisma.contact.updateMany({
      where: {
        id,
        entityId,
      },
      data,
    });
  }

  async deleteContact (
    entityId: string,
    id: string,
  ) {
    return this.prisma.contact.deleteMany({
      where: {
        id,
        entityId,
      },
    });
  }
}
