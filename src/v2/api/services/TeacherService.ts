import { Injectable } from '@nestjs/common';
import { CreateContactDTO } from '../dtos/CreateContactDTO';
import { EntityType, QuestionDisplay, QuestionType, Prisma } from '@prisma/client';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { UpdateContactDTO } from '../dtos/UpdateContactDTO';
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { InvalidQueryException } from '../../utils/exceptions/InvalidQueryException';
import { QueryAllTeacherDTO } from '../dtos/QueryAllTeacherDTO';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { PollService } from './PollService';
import { ResponseQueryDTO } from '../dtos/ResponseQueryDTO';
import { SearchDTO } from '../../utils/QueryAllDTO';

@Injectable()
export class TeacherService {
  constructor (
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private teacherMapper: TeacherMapper,
    private disciplineTeacherService: DisciplineTeacherService,
    private contactRepository: ContactRepository,
    private subjectRepository: SubjectRepository,
    private pollService: PollService
  ) {}

  async getAll (body: QueryAllTeacherDTO) {

    const searchedNames = body.search ? body.search.split(/\s+/g) : [];
    const search = {
      AND: searchedNames.map((search) => ({
        ...DatabaseUtils.getSearch({ search } as SearchDTO, 'firstName', 'lastName', 'middleName'),
      })),
    };
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    const data: Prisma.TeacherFindManyArgs = {
      where: {
        ...search,
        disciplineTeachers: body.group != null ?  {
          some: {
            discipline: {
              groupId: body.group,
            },
          },
        } : undefined,
      },
      ...page,
      ...sort,
    };

    return this.teacherRepository.findMany(data);
  }

  async getTeacher (
    id: string,
  ) {
    const dbTeacher = await this.teacherRepository.findById(id);
    const { disciplineTeachers, ...teacher } = dbTeacher;
    const roles = this.teacherMapper.getRoles(dbTeacher);
    const contacts = await this.contactRepository.getAllContacts(id);

    return {
      teacher,
      roles,
      contacts,
    };
  }

  async getUserDisciplineTeachers (teacherId: string, userId: string, notAnswered: boolean) {
    return this.disciplineTeacherRepository.findMany({
      where: {
        teacherId,
        discipline: {
          group: {
            students: {
              some: {
                userId,
              },
            },
          },
        },
        ...DatabaseUtils.getOptional(notAnswered, {
          NOT: {
            questionAnswers: {
              some: {
                userId,
              },
            },
          },
        }),
      },
    });
  }

  async getTeacherRoles (
    teacherId: string,
  ) {
    const teacher = await this.teacherRepository.findById(teacherId);
    return this.teacherMapper.getRoles(teacher);
  }

  async create (
    body: Prisma.TeacherUncheckedCreateInput,
  ) {
    return this.teacherRepository.create(body);
  }

  async update (
    id: string,
    body: Prisma.TeacherUncheckedUpdateInput
  ) {
    return this.teacherRepository.updateById(id, body);
  }

  async delete (
    id: string,
  ) {
    await this.teacherRepository.deleteById(id);
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

  async getMarks (teacherId: string, data?: ResponseQueryDTO) {
    this.checkQueryDate(data);
    const marks = [];
    const questions = await this.pollService.getQuestionWithMarks(teacherId, data);
    for (const question of questions) {
      if (question.questionAnswers.length === 0) continue;
      const count = question.questionAnswers.length;
      const mark = this.getRightMarkFormat(question);
      marks.push({
        name: question.name,
        amount: count,
        type: question.display,
        mark,
      });
    }
    return marks;
  }

  private parseMark (type: QuestionType, marksSum: number, answerQty: number) {
    const divider = (answerQty * ((type === QuestionType.SCALE) ? 10 : 1));
    return parseFloat(((marksSum / divider) * 100).toFixed(2));
  }

  private getRightMarkFormat ({ display, type, questionAnswers: answers }) {
    if (display === QuestionDisplay.RADAR || display === QuestionDisplay.CIRCLE) {
      return this.parseMark(type, answers.reduce((acc, answer) => acc + (+answer.value), 0), answers.length);
    } else if (display === QuestionDisplay.AMOUNT) {
      const table = {};
      for (let i = 1; i <= 10; i++) {
        table[i] = answers.filter((a) => +a.value === i).length;
      }
      return table;
    }
  }

  checkQueryDate ({ semester, year }: ResponseQueryDTO) {
    if ((!year && semester) || (year && !semester)) {
      throw new InvalidQueryException();
    }
  }

  async getTeacherSubjects (teacherId: string) {

    return this.subjectRepository.getAll({
      where: {
        disciplines: {
          some: {
            disciplineTeachers: {
              some: {
                teacherId,
              },
            },
          },
        },
      },
    }
    );
  }

  async getTeacherSubject (teacherId: string, subjectId: string) {
    const dbTeacher = await this.teacherRepository.find({
      id: teacherId,
      disciplineTeachers: {
        some: {
          discipline: {
            subjectId,
          },
        },
      },
    });

    if (!dbTeacher) {
      throw new InvalidEntityIdException('subject');
    }

    const { disciplineTeachers, ...teacher } = dbTeacher;

    const roles = this.teacherMapper.getRoles(dbTeacher);
    const { disciplines, ...subject } = await this.subjectRepository.findById(subjectId);
    const contacts = await this.contactRepository.getAllContacts(teacherId);

    return {
      ...teacher,
      subject,
      roles,
      contacts,
    };
  }
}
