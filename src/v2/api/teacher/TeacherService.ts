import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type QueryAllDTO } from '../../utils/QueryAllDTO';
import { type CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { type UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { type CreateContactDTO } from './dto/CreateContactDTO';
import { EntityType } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { type UpdateContactDTO } from './dto/UpdateContactDTO';

@Injectable()
export class TeacherService {
  constructor (
    private readonly teacherRepository: TeacherRepository,
    private readonly disciplineTeacherRepository: DisciplineTeacherRepository,
    private readonly disciplineTypeRepository: DisciplineTypeRepository,
    private readonly prisma: PrismaService
  ) {}

  async getAll (
    body: QueryAllDTO
  ) {
    const teachers = await this.teacherRepository.getAll(body);
    return { teachers };
  }

  async create (
    body: CreateTeacherDTO
  ) {
    return await this.teacherRepository.create(body);
  }

  async getTeacher (
    id: string
  ) {
    return await this.teacherRepository.getTeacher(id);
  }

  async update (
    id: string,
    body: UpdateTeacherDTO
  ) {
    await this.teacherRepository.update(id, body);
  }

  async delete (
    id: string
  ) {
    await this.teacherRepository.delete(id);
  }

  async getAllContacts (
    entityId: string
  ) {
    const contacts = (await this.teacherRepository.getAllContacts(entityId))
      .map(
        (c) => ({ name: c.name, value: c.value })
      );
    return { contacts };
  }

  async getContact (
    teacherId: string,
    name: string
  ) {
    const contact = await this.teacherRepository.getContact(teacherId, name);
    return {
      name: contact.name,
      value: contact.value,
    };
  }

  async createContact (
    entityId: string,
    body: CreateContactDTO
  ) {
    return await this.teacherRepository.createContact({
      entityId,
      entityType: EntityType.TEACHER,
      ...body,
    });
  }

  async updateContact (
    entityId: string,
    name: string,
    body: UpdateContactDTO
  ) {
    await this.teacherRepository.updateContact(
      entityId, name, body
    );
  }

  async deleteContact (
    entityId: string,
    name: string
  ) {
    await this.teacherRepository.deleteContact(
      entityId, name
    );
  }
}
