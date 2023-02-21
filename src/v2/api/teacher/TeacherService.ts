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
    const questions = await this.markQueryCheck(teacherId, { subjectId, year, semester });
    for (const question of questions) {
      const count = question.questionAnswers.length;
      let marksSum = 0;
      let mark;
      if (question.display === QuestionDisplay.PERCENT) {
        for (const answer of question.questionAnswers) {
          marksSum += parseInt(answer.value);
        }
        mark = this.parseMark(question.type, marksSum, count).mark;
      } else if (question.display === QuestionDisplay.AMOUNT) {
        const table =
            {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
            };
        for (const answer of question.questionAnswers) {
          table[`${parseInt(answer.value)}`]++;
        }
        mark = table;
      }

      marks.push({
        questionId: question.id,
        questionName: question.name,
        numberOfAnswers: count,
        mark,
      });
    }
    return marks;
  }
  parseMark (type: QuestionType, marksSum: number, answerQty: number) {
    if (type === QuestionType.SCALE) {
      return {
        mark: parseFloat(((marksSum / (answerQty * 10)) * 100).toFixed(2)),
      };
    } else {
      return {
        mark: parseFloat(((marksSum / (answerQty)) * 100).toFixed(2)),
      };
    }
  }
  markQueryCheck (teacherId: string, { subjectId, year, semester }: MarksDTO) {
    if (!subjectId && !year && !semester) {
      return this.teacherRepository.getMarksFullData(teacherId);
    } else if (!year && !semester) {
      return this.teacherRepository.getMarksWithSubjectId(teacherId, subjectId);
    } else if (!subjectId) {
      return this.teacherRepository.getMarksForDate(teacherId, year, semester);
    } else {
      return this.teacherRepository.getMarks(teacherId, subjectId, year, semester);
    }
  }
}
