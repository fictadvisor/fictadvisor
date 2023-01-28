import { Injectable } from '@nestjs/common';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from './dto/CreateContactDTO';
import { EntityType } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { UpdateContactDTO } from './dto/UpdateContactDTO';

@Injectable()
export class TeacherService {
  constructor(
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}


  async getAll(
    body: QueryAllDTO,
  ) {
    const teachers = await this.teacherRepository.getAll(body);
    return { teachers };
  }

  async getTeacher(
    id: string,
    ) {
      return this.teacherRepository.getTeacher(id);
    }

  async getTeacherRoles(
    teacherId: string,
    ) {
      const disciplineTeachers = await this.teacherRepository.getDisciplineTeachers(teacherId);
      const results = [];

      for (const discipline of disciplineTeachers) {
        const roles = await this.disciplineTeacherRepository.getRoles(discipline.id);
        for (const role of roles) {
          if (results.includes(role.role)) continue
          results.push(role.role);
        }
      }
      return { roles: results }
    }

  async create(
    body: CreateTeacherDTO,
  ) {
    return this.teacherRepository.create(body);
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
    const contacts = (await this.teacherRepository.getAllContacts(entityId))
      .map(
        (c) => ({ name: c.name, value: c.value })
      );
    return { contacts };
  }

  async getContact(
    teacherId: string,
    name: string,
  ) {
    const contact = await this.teacherRepository.getContact(teacherId, name);
    return {
      name: contact.name,
      value: contact.value,
    };
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