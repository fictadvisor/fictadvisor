import { Injectable } from '@nestjs/common';
import { CreateContactDTO } from '../dtos/CreateContactDTO';
import { EntityType, QuestionDisplay, Prisma, QuestionType } from '@prisma/client';
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
import { filterAsync } from '../../utils/ArrayUtil';
import { DbDisciplineTeacher } from '../../database/entities/DbDisciplineTeacher';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { DateService } from '../../utils/date/DateService';
import { DbTeacher } from 'src/v2/database/entities/DbTeacher';
import { SortQATParam } from '../dtos/SortQATParam';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DbDisciplineTeacherWithAnswers } from '../../database/entities/DbDisciplineTeacherWithAnswers';

@Injectable()
export class TeacherService {
  constructor (
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private teacherMapper: TeacherMapper,
    private disciplineTeacherService: DisciplineTeacherService,
    private contactRepository: ContactRepository,
    private subjectRepository: SubjectRepository,
    private pollService: PollService,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private dateService: DateService,
    private questionMapper: QuestionMapper,
  ) {}

  async getAll (body: QueryAllTeacherDTO) {
    const searchedNames = body.search ? body.search.split(/\s+/g) : [];
    const search = {
      AND: searchedNames.map((search) => ({
        ...DatabaseUtils.getSearch({ search } as SearchDTO,
          SortQATParam.FIRST_NAME.toString(),
          SortQATParam.LAST_NAME.toString(),
          SortQATParam.MIDDLE_NAME.toString()),
      })),
    };
    const sort = this.teacherMapper.getSortedTeacher(body);

    const data: Prisma.TeacherFindManyArgs = {
      where: {
        ...search,
        disciplineTeachers: body.group ?  {
          some: {
            discipline: {
              groupId: body.group,
            },
          },
        } : undefined,
      },
      ...sort,
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
            questionAnswers: {
              where: {
                question: {
                  type: {
                    in: [QuestionType.SCALE, QuestionType.TOGGLE],
                  },
                },
              },
              include: {
                question: true,
              },
            },
          },
        },
      },
    };

    return await DatabaseUtils.paginate<DbTeacher>(this.teacherRepository, body, data);
  }

  async getAllTeachersWithRating (body: QueryAllTeacherDTO) {
    const teachers = await this.getAll(body);
    const teachersWithRating = [];
    for (const { disciplineTeachers, ...dbTeacher } of teachers.data) {
      const sortedQuestionsWithAnswers = this.questionMapper.getSortedQuestionsWithAnswers(disciplineTeachers as any as DbDisciplineTeacherWithAnswers[]);
      const marks = this.questionMapper.getMarks(sortedQuestionsWithAnswers);

      teachersWithRating.push({
        ...this.teacherMapper.getTeacher(dbTeacher as DbTeacher),
        rating: this.getRating(marks),
      });
    }
    return { data: teachersWithRating, meta: teachers.meta };
  }

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

  async getTeacher (
    id: string,
  ) {
    const dbTeacher = await this.teacherRepository.findById(id);
    const { disciplineTeachers, ...teacher } = dbTeacher;
    const roles = this.teacherMapper.getRoles(dbTeacher);
    const contacts = await this.contactRepository.getAllContacts(id);
    const marks = await this.getMarks(id);
    const rating = this.getRating(marks);

    return {
      ...teacher,
      roles,
      contacts,
      rating,
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
    return marks;
  }

  checkQueryDate ({ semester, year }: ResponseQueryDTO) {
    if ((!year && semester) || (year && !semester)) {
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

    const roles = this.disciplineTeacherMapper.getRolesBySubject(disciplineTeachers as DbDisciplineTeacher[], subjectId);
    const { disciplines, ...subject } = await this.subjectRepository.findById(subjectId);
    const contacts = await this.contactRepository.getAllContacts(teacherId);
    const data = {
      subjectId,
    };
    const marks = await this.getMarks(teacherId, data);
    const rating = this.getRating(marks);

    return {
      ...teacher,
      subject,
      roles,
      contacts,
      rating,
    };
  }
}
