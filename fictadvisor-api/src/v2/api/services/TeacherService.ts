import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  CreateContactDTO,
  UpdateContactDTO,
  QueryAllTeacherDTO,
  ResponseQueryDTO,
  ComplaintDTO,
} from '@fictadvisor/utils/requests';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { filterAsync } from '../../utils/ArrayUtil';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { PollService } from './PollService';
import { DateService } from '../../utils/date/DateService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { DbDisciplineTeacher } from '../../database/entities/DbDisciplineTeacher';
import { DbTeacher } from 'src/v2/database/entities/DbTeacher';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { InvalidQueryException } from '../../utils/exceptions/InvalidQueryException';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { EntityType, QuestionDisplay, Prisma } from '@prisma/client';
import { SubjectMapper } from '../../mappers/SubjectMapper';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import * as process from 'process';

@Injectable()
export class TeacherService {
  constructor (
    private readonly teacherRepository: TeacherRepository,
    private readonly disciplineTeacherRepository: DisciplineTeacherRepository,
    private readonly teacherMapper: TeacherMapper,
    private readonly disciplineTeacherService: DisciplineTeacherService,
    private readonly contactRepository: ContactRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly pollService: PollService,
    private readonly disciplineTeacherMapper: DisciplineTeacherMapper,
    private readonly dateService: DateService,
    private readonly questionMapper: QuestionMapper,
    private readonly telegramAPI: TelegramAPI,
    private readonly groupRepository: GroupRepository,
    private readonly subjectMapper: SubjectMapper,
  ) {}

  async getAll (body: QueryAllTeacherDTO) {
    const search = {
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
    };

    const sort = this.teacherMapper.getSortedTeacher(body);

    const data: Prisma.TeacherFindManyArgs = {
      where: {
        ...search,
      },
      ...sort,
    };

    return await DatabaseUtils.paginate<DbTeacher>(this.teacherRepository, body, data);
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
          amountSum += m.mark[mark]*(+mark);
        }
        return sum + (amountSum/m.amount)*10;
      } else {
        return sum + m.mark;
      }
    }, 0);
    return +(sum/marks.length).toFixed(2);
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
    const dbTeacher = await this.teacherRepository.findById(id);
    const contacts = await this.contactRepository.getAllContacts(id);

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

    return filterAsync(disciplineTeachers as DbDisciplineTeacher[], async ({ discipline, id }) => {
      const isRemoved = await this.disciplineTeacherRepository.find({
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

  async getTeacherRoles (teacherId: string) {
    const teacher = await this.teacherRepository.findById(teacherId);
    return this.teacherMapper.getTeacherRoles(teacher);
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
    return this.contactRepository.getAllContacts(entityId);
  }

  async getContact (teacherId: string, contactId: string) {
    const contact = await this.contactRepository.getContact(teacherId, contactId);

    if (!contact)
      return null;

    return {
      name: contact.name,
      displayName: contact.displayName,
      link: contact.link,
    };
  }

  async createContact (entityId: string, body: CreateContactDTO,) {
    return this.contactRepository.createContact({
      entityId,
      entityType: EntityType.TEACHER,
      ...body,
    });
  }

  async updateContact (entityId: string, contactId: string, body: UpdateContactDTO) {
    await this.contactRepository.updateContact(entityId, contactId, body);
    return this.contactRepository.getContact(entityId, contactId);
  }

  async deleteContact (entityId: string, contactId: string) {
    await this.contactRepository.deleteContact(
      entityId, contactId,
    );
  }

  async getMarks (teacherId: string, data?: ResponseQueryDTO) {
    if (data) {
      this.checkQueryDate(data);
    }
    const marks = [];
    const questions = await this.pollService.getQuestionWithMarks(teacherId, data);
    for (const question of questions) {
      if (question.questionAnswers.length === 0) continue;
      const count = question.questionAnswers.length;
      const mark = this.questionMapper.getRightMarkFormat(question);
      marks.push({
        name: question.name,
        amount: count,
        type: question.display,
        mark,
      });
    }
    return marks.sort((a, b) => b.amount - a.amount);
  }

  checkQueryDate ({ semester, year }: ResponseQueryDTO) {
    if (!year !== !semester) {
      throw new InvalidQueryException();
    }
  }

  async getTeacherSubjects (teacherId: string) {

    return this.subjectRepository.findMany({
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

  async getTeacherSubject (teacherId: string, subjectId: string): Promise<TeacherWithContactsFullResponse> {
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
      throw new InvalidEntityIdException('Subject');
    }

    const { disciplineTeachers } = dbTeacher;

    const disciplineTypes = this.disciplineTeacherMapper.getRolesBySubject(disciplineTeachers, subjectId);
    const subject = await this.subjectRepository.findById(subjectId);
    const contacts = await this.contactRepository.getAllContacts(teacherId);

    return {
      ...this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher),
      subject: this.subjectMapper.getSubject(subject),
      disciplineTypes,
      contacts,
    };
  }

  async sendComplaint (teacherId: string, body: ComplaintDTO) {
    const { fullName = 'не вказано', groupId, title, message } = body;

    const code = groupId
      ? (await this.groupRepository.findById(groupId))?.code
      : 'не вказано';
    if (!code) throw new InvalidEntityIdException('Group');

    const { lastName, firstName, middleName } = await this.teacherRepository.findById(teacherId);

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
