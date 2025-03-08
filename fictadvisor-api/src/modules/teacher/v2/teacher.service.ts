import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  CreateContactDTO,
  UpdateContactDTO,
  QueryAllTeachersDTO,
  QueryMarksDTO,
  ComplaintDTO,
} from '@fictadvisor/utils/requests';
import {
  SubjectResponse,
  TeacherWithContactsFullResponse,
  TeacherWithRolesAndCathedrasResponse,
} from '@fictadvisor/utils/responses';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { extractField, filterAsync, makeUnique } from '../../../common/utils/array.utils';
import { TelegramAPI } from '../../telegram-api/telegram-api';
import { PollService } from '../../poll/v2/poll.service';
import { DateService } from '../../date/v2/date.service';
import { DisciplineTeacherService } from './discipline-teacher.service';
import { DbDisciplineTeacher } from '../../../database/v2/entities/discipline-teacher.entity';
import { DbTeacher } from '../../../database/v2/entities/teacher.entity';
import { TeacherRepository } from '../../../database/v2/repositories/teacher.repository';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/discipline-teacher.repository';
import { SubjectRepository } from '../../../database/v2/repositories/subject.repository';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import { ContactRepository } from '../../../database/v2/repositories/contact.repository';
import { InvalidQueryException } from '../../../common/exceptions/invalid-query.exception';
import { InvalidEntityIdException } from '../../../common/exceptions/invalid-entity-id.exception';
import { EntityType, QuestionDisplay, Prisma } from '@prisma/client/fictadvisor';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import * as process from 'process';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbSubject } from '../../../database/v2/entities/subject.entity';
import { DbQuestion } from '../../../database/v2/entities/question.entity';
import {
  MarkArray,
  OrderQAParam,
  QuestionType,
  Sort,
  SortDTO,
  SortQATParam,
} from '@fictadvisor/utils';

@Injectable()
export class TeacherService {
  constructor (
    private readonly teacherRepository: TeacherRepository,
    private readonly disciplineTeacherRepository: DisciplineTeacherRepository,
    private readonly disciplineTeacherService: DisciplineTeacherService,
    private readonly contactRepository: ContactRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly pollService: PollService,
    private readonly dateService: DateService,
    private readonly telegramAPI: TelegramAPI,
    private readonly groupRepository: GroupRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAll (body: QueryAllTeachersDTO) {
    const data: PaginateArgs<'teacher'> = {
      where: {
        AND: [
          this.getSearchForTeachers.fullName(body.search),
          body.groupId?.length ? this.getSearchForTeachers.group(body.groupId) : {},
          body.disciplineTypes?.length ? this.getSearchForTeachers.disciplineTypes(body.disciplineTypes) : {},
          {
            OR: [
              body.notInDepartments ? {
                NOT: this.getSearchForTeachers.cathedras(body.cathedrasId),
              } : {},
              body.cathedrasId?.length ? this.getSearchForTeachers.cathedras(body.cathedrasId) : {},
            ],
          },
        ],
      },
      ...this.getSortedTeacher(body),
    };

    return await PaginationUtil.paginate<'teacher', DbTeacher>(this.teacherRepository, body, data);
  }

  private getSortedTeacher ({ sort, order }: SortDTO): Sort {
    if (!sort) sort = SortQATParam.LAST_NAME;
    if (!order) order = OrderQAParam.ASC;
    const orderBy = [{ [sort]: order }];

    orderBy.push({ [SortQATParam.LAST_NAME]: order });
    orderBy.push({ [SortQATParam.FIRST_NAME]: order });
    orderBy.push({ [SortQATParam.MIDDLE_NAME]: order });

    return { orderBy };
  }

  private getSearchForTeachers = {
    fullName: (search: string) => (DatabaseUtils.getSearch({ search }, 'firstName', 'lastName', 'middleName')),
    group: (groupId: string) => ({
      disciplineTeachers: {
        some: {
          discipline: DatabaseUtils.getStrictSearch(groupId, 'groupId'),
        },
      },
    }),
    cathedras: (cathedrasId: string[]) => ({
      cathedras: {
        some: DatabaseUtils.getSearchByArray(cathedrasId, 'cathedraId'),
      },
    }),
    disciplineTypes: (disciplineTypes: DisciplineTypeEnum[]) => ({
      disciplineTeachers: {
        some: {
          roles: {
            some: {
              disciplineType: DatabaseUtils.getSearchByArray(disciplineTypes, 'name'),
            },
          },
        },
      },
    }),
  };

  getRating (marks) {
    if (!marks.length || marks[0].amount < 8) {
      return 0;
    }

    const sum = marks.reduce((sum, m) => {
      if (m.type === QuestionDisplay.AMOUNT) {
        let amountSum = 0;
        for (const mark in m.mark) {
          amountSum += m.mark[mark] * (+mark);
        }
        return sum + (amountSum / m.amount) * 10;
      } else {
        return sum + m.mark;
      }
    }, 0);
    return +(sum / marks.length).toFixed(2);
  }

  @Cron('0 0 3 * * *')
  async updateRating () {
    const teachers = await this.teacherRepository.findMany({});
    if (!teachers.length) return;
    for (const { id } of teachers) {
      const marks = await this.getMarks(id);
      const rating = this.getRating(marks);
      await this.teacherRepository.updateById(id, { rating });
    }
  }

  async getTeacher (id: string) {
    const dbTeacher = await this.teacherRepository.findOne({ id });
    const contacts = await this.contactRepository.findMany({ entityId: id });

    return {
      dbTeacher,
      contacts,
    };
  }

  async connectTeacherWithCathedra (teacherId: string, cathedraId: string) {
    await this.teacherRepository.updateById(teacherId, {
      cathedras: {
        create: {
          cathedraId,
        },
      },
    });
    return this.getTeacher(teacherId);
  }

  async disconnectTeacherFromCathedra (teacherId: string, cathedraId: string) {
    await this.teacherRepository.updateById(teacherId, {
      cathedras: {
        delete: {
          teacherId_cathedraId: {
            teacherId,
            cathedraId,
          },
        },
      },
    });

    return this.getTeacher(teacherId);
  }

  async getUserDisciplineTeachers (teacherId: string, userId: string, notAnswered: boolean) {
    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
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
    });

    return filterAsync(disciplineTeachers as DbDisciplineTeacher[], async ({ discipline, id }) => {
      const isRemoved = await this.disciplineTeacherRepository.findOne({
        id,
        removedDisciplineTeachers: {
          some: {
            studentId: userId,
          },
        },
      });
      const isPrevious = await this.dateService.isPreviousSemesterToCurrent(discipline.semester, discipline.year);
      return isPrevious &&
        !await this.disciplineTeacherService.isNotSelectedByUser(userId, discipline) &&
        !isRemoved;
    });
  }

  async getTeacherRoles (id: string) {
    const teacher = await this.teacherRepository.findOne({ id });
    if (!teacher.disciplineTeachers) return [];

    const disciplineTypes: DisciplineTypeEnum[] = [];
    for (const { roles } of teacher.disciplineTeachers) {
      disciplineTypes.push(
        ...extractField(extractField(roles, 'disciplineType'), 'name') as DisciplineTypeEnum[]);
    }

    return makeUnique(disciplineTypes);
  }

  async create (body: Prisma.TeacherUncheckedCreateInput) {
    return this.teacherRepository.create(body);
  }

  async update (id: string, body: Prisma.TeacherUncheckedUpdateInput) {
    return this.teacherRepository.updateById(id, body);
  }

  async delete (id: string) {
    await this.teacherRepository.deleteById(id);
  }

  async getAllContacts (entityId: string) {
    return this.contactRepository.findMany({ entityId });
  }

  async getContact (teacherId: string, contactId: string) {
    const contact = await this.contactRepository.findOne({
      id: contactId,
      entityId: teacherId,
    });

    if (!contact)
      return null;

    return {
      name: contact.name,
      displayName: contact.displayName,
      link: contact.link,
    };
  }

  async createContact (entityId: string, body: CreateContactDTO) {
    return this.contactRepository.create({
      entityId,
      entityType: EntityType.TEACHER,
      ...body,
    });
  }

  async updateContact (contactId: string, body: UpdateContactDTO) {
    return this.contactRepository.updateById(contactId, body);
  }

  async deleteContact (contactId: string) {
    await this.contactRepository.deleteById(contactId);
  }

  async getMarks (teacherId: string, data?: QueryMarksDTO) {
    if (data) {
      this.checkQueryDate(data);
    }
    const marks = [];
    const questions = await this.pollService.getQuestionWithMarks(teacherId, data);
    for (const question of questions) {
      if (question.questionAnswers.length === 0) continue;
      const count = question.questionAnswers.length;
      const mark = TeacherService.getRightMarkFormat(question);
      marks.push({
        name: question.name,
        amount: count,
        type: question.display,
        mark,
      });
    }
    return marks.sort((a, b) => b.amount - a.amount);
  }

  private static parseMark (type: QuestionType, marksSum: number, answerQty: number) {
    const divider = (answerQty * ((type === QuestionType.SCALE) ? 10 : 1));
    return parseFloat(((marksSum / divider) * 100).toFixed(2));
  }

  static getRightMarkFormat ({ display, type, questionAnswers: answers }: DbQuestion): number | MarkArray {
    if (display === QuestionDisplay.RADAR || display === QuestionDisplay.CIRCLE) {
      return this.parseMark(type as QuestionType, answers.reduce((acc, answer) => acc + (+answer.value), 0), answers.length);
    } else if (display === QuestionDisplay.AMOUNT) {
      const table = {};
      for (let i = 1; i <= 10; i++) {
        table[i] = answers.filter((a) => +a.value === i).length;
      }
      return table as MarkArray;
    }
  }

  checkQueryDate ({ semester, year }: QueryMarksDTO) {
    if (!year !== !semester) {
      throw new InvalidQueryException();
    }
  }

  async getTeacherSubjects (teacherId: string) {

    return this.subjectRepository.findMany({
      disciplines: {
        some: {
          disciplineTeachers: {
            some: {
              teacherId,
            },
          },
        },
      },
    });
  }

  async getTeacherSubject (teacherId: string, subjectId: string): Promise<TeacherWithContactsFullResponse> {
    const dbTeacher = await this.teacherRepository.findOne({
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
      throw new InvalidEntityIdException('Subject');
    }

    const { disciplineTeachers } = dbTeacher;

    const disciplineTypes = this.getRolesBySubject(disciplineTeachers, subjectId);
    const subject = await this.subjectRepository.findOne({ id: subjectId });
    const contacts = await this.contactRepository.findMany({ entityId: teacherId });

    return {
      ...this.mapper.map(dbTeacher, DbTeacher, TeacherWithRolesAndCathedrasResponse),
      subject: this.mapper.map(subject, DbSubject, SubjectResponse),
      disciplineTypes,
      contacts,
    };
  }

  private getRolesBySubject (disciplineTeachers: DbDisciplineTeacher[], subjectId: string): DisciplineTypeEnum[] {
    const disciplineTypes = new Set<DisciplineTypeEnum>();
    for (const disciplineTeacher of disciplineTeachers) {
      if (disciplineTeacher.discipline.subjectId === subjectId) {
        for (const { disciplineType } of disciplineTeacher.roles) {
          disciplineTypes.add(disciplineType.name as DisciplineTypeEnum);
        }
      }
    }

    return Array.from(disciplineTypes);
  }

  async sendComplaint (teacherId: string, body: ComplaintDTO) {
    const { fullName = 'не вказано', groupId, title, message } = body;

    const code = groupId
      ? (await this.groupRepository.findOne({ id: groupId }))?.code
      : 'не вказано';
    if (!code) throw new InvalidEntityIdException('Group');

    const { lastName, firstName, middleName } = await this.teacherRepository.findOne({ id: teacherId });
    await this.teacherRepository.updateById(teacherId, {
      complaints: {
        create: body,
      },
    });

    const text =
      '<b>Скарга на викладача:</b>\n\n' +
      `<b>Викладач:</b> ${lastName} ${firstName} ${middleName}\n` +
      `<b>Студент:</b> ${fullName}\n` +
      `<b>Група:</b> ${code}\n\n` +
      `${title}\n\n` +
      `${message}`;
    const chatId = process.env.COMPLAINT_CHAT_ID;

    await this.telegramAPI.sendMessage(text, chatId);
  }
}
