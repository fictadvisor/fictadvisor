import { Injectable } from '@nestjs/common';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from '../user/dto/CreateContactDTO';
import { EntityType, QuestionType } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { UpdateContactDTO } from '../user/dto/UpdateContactDTO';
import { ContactRepository } from '../user/ContactRepository';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { MarksDTO } from './query/MarksDTO';

@Injectable()
export class TeacherService {
  constructor (
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherService: DisciplineTeacherService,
    private contactRepository: ContactRepository,
  ) {
  }


  async getAll (
    body: QueryAllDTO,
  ) {
    const teachers = await this.teacherRepository.getAll(body);
    return { teachers };
  }

  async getTeacher (
    id: string,
  ) {
    const { disciplineTeachers, ...teacher } = await this.teacherRepository.getTeacher(id);
    const contacts = await this.contactRepository.getAllContacts(id);
    const roles = this.disciplineTeacherService.getUniqueRoles(disciplineTeachers);

    return {
      ...teacher,
      roles,
      contacts,
    };
  }

  async getTeacherRoles (
    teacherId: string,
  ) {
    const teacher = await this.teacherRepository.getTeacher(teacherId);
    return this.disciplineTeacherService.getUniqueRoles(teacher.disciplineTeachers);
  }

  async create (
    body: CreateTeacherDTO,
  ) {
    return this.teacherRepository.create(body);
  }

  async update (id: string, body: UpdateTeacherDTO) {
    return this.teacherRepository.update(id, body);
  }

  async delete (
    id: string,
  ) {
    await this.teacherRepository.delete(id);
  }

  async getAllContacts (
    entityId: string,
  ) {
    return this.contactRepository.getAllContacts(entityId);
  }

  async getContact (
    teacherId: string,
    name: string,
  ) {
    const contact = await this.contactRepository.getContact(teacherId, name);
    return {
      name: contact.name,
      displayName: contact.displayName,
      link: contact.link,
    };
  }

  async createContact (
    entityId: string,
    body: CreateContactDTO,
  ) {
    return this.contactRepository.createContact({
      entityId,
      entityType: EntityType.TEACHER,
      ...body,
    });
  }

  async updateContact (entityId: string, name: string, body: UpdateContactDTO) {
    await this.contactRepository.updateContact(entityId, name, body);
    return this.contactRepository.getContact(entityId, name);
  }

  async deleteContact (
    entityId: string,
    name: string,
  ) {
    await this.contactRepository.deleteContact(
      entityId, name,
    );
  }

  async getMarks (teacherId: string, { subjectId, year, semester }: MarksDTO) {
    const marks = [];
    let questions;
    if (!subjectId) {
      questions = await this.teacherRepository.getMarksFullData(teacherId);
    } else if (!year && !semester) {
      questions = await this.teacherRepository.getMarksWithSubjectId(teacherId, subjectId);
    } else {
      questions = await this.teacherRepository.getMarks(teacherId, subjectId, year, semester);
    }
    for (const question of questions) {
      let mark;
      let marksSum = 0;
      for (const answer of question.questionAnswers) {
        marksSum = parseInt(answer.value);
      }
      const count = question.questionAnswers.length;
      if (question.type === QuestionType.SCALE) mark = ((marksSum/(count*10))*100).toFixed(2);
      else mark = ((marksSum/(count))*100).toFixed(2);
      marks.push({
        questionId: question.id,
        questionName: question.name,
        numberOfAnswers: count,
        mark,
      });
    }
    return marks;
  }
}
