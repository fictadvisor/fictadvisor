import { Injectable } from '@nestjs/common';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from '../user/dto/CreateContactDTO';
import { EntityType, QuestionDisplay, QuestionType } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { UpdateContactDTO } from '../user/dto/UpdateContactDTO';
import { ContactRepository } from '../user/ContactRepository';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { MarksQueryDTO } from './query/MarksQueryDTO';

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

  async getMarks (teacherId: string, data?: MarksQueryDTO) {
    const marks = [];
    const questions = await this.teacherRepository.getMarks(teacherId, data);
    for (const question of questions) {
      const count = question.questionAnswers.length;
      if (count < 1) continue;
      const mark = this.getRightMarkFormat(question);
      marks.push({
        name: question.name,
        amount: count,
        type: question.type,
        mark,
      });

    }
    return marks;
  }
  parseMark (type: QuestionType, marksSum: number, answerQty: number) {
    return parseFloat(((marksSum / (answerQty * ((type === QuestionType.SCALE) ? 10 : 1))) * 100).toFixed(2));
  }
  getRightMarkFormat (question) {
    const { display, type, questionAnswers: answers } = question;
    if (display === QuestionDisplay.PERCENT) {
      return this.parseMark(type, answers.reduce((acc, answer) => acc + (+answer.value), 0), answers.length);
    } else if (display === QuestionDisplay.AMOUNT) {
      const table = {};
      for (let i = 1; i <= 10; i++) {
        table[i] = answers.filter((a) => +a.value === i).length;
      }
      return table;
    }
  }
}
