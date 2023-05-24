import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { CreateContactData } from '../../api/datas/CreateContactData';
import { UpdateContactData } from '../../api/datas/UpdateContactData';

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

  async getContact (entityId: string, name: string) {
    return this.prisma.contact.findFirst({
      where: {
        entityId,
        name,
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        link: true,
      },
    });
  }

  async createContact (data: CreateContactData) {
    return this.prisma.contact.create({
      data,
    });
  }

  async updateContact (
    entityId: string,
    name: string,
    data: UpdateContactData,
  ) {
    return this.prisma.contact.updateMany({
      where: {
        entityId,
        name,
      },
      data,
    });
  }

  async deleteContact (
    entityId: string,
    name: string,
  ) {
    return this.prisma.contact.deleteMany({
      where: {
        entityId,
        name,
      },
    });
  }
}