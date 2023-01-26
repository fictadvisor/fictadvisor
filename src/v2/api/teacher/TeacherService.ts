import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from './dto/CreateContactDTO';
import { EntityType } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { UpdateContactDTO } from './dto/UpdateContactDTO';


@Injectable()
export class TeacherService {
  constructor(
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    private prisma: PrismaService
  ) {}


  async getAll(
    body: QueryAllDTO,
  ) {
    return this.teacherRepository.getAll(body);
  }

  async create(
    body: CreateTeacherDTO,
  ) {
    return this.teacherRepository.create(body);
  }

  async getTeacher(
    id: string,
  ) {
    return this.teacherRepository.getTeacher(id);
  }

  async update(
    id: string,
    body: UpdateTeacherDTO,
  ) {  
    await this.teacherRepository.update(id, body);
  }

  async delete(
    id: string,
  ) {
    await this.teacherRepository.delete(id);
  }

  async getAllContacts(
    entityId: string,
  ) {
    return this.teacherRepository.getAllContacts(entityId);
  }

  async getContact(
    teacherId: string,
    name: string,
  ) {
    return this.teacherRepository.getContact(teacherId, name);
  }

  async createContact(
    entityId: string,
    body: CreateContactDTO,
  ) {
    return this.teacherRepository.createContact({
      entityId,
      entityType: EntityType.TEACHER,
      ...body,
    });
  }

  async updateContact(
    entityId: string,
    name: string,
    body: UpdateContactDTO,
  ) {
    await this.teacherRepository.updateContact(
      entityId, name, body,
    );
  }

  async deleteContact(
    entityId: string,
    name: string,
  ) {
    await this.teacherRepository.deleteContact(
      entityId, name,
    );
  }
}