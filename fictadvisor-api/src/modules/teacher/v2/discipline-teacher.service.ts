import { Injectable } from '@nestjs/common';
import {
  CreateAnswerDTO,
  CreateAnswersDTO,
  ResponseDTO,
  QueryAllCommentsDTO,
  QuerySemesterDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeacherQuestionsResponse,
  QuestionWithCategoryResponse,
  TeacherResponse,
  SubjectResponse,
} from '@fictadvisor/utils/responses';
import { CommentsSortBy, DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { TelegramAPI } from '../../telegram-api/telegram-api';
import { isArrayUnique } from '../../../common/utils/array.utils';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DbQuestionAnswer } from '../../../database/v2/entities/question-answer.entity';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { PaginatedData } from '../../../database/types/paginated.data';
import { PollService } from '../../poll/v2/poll.service';
import { DateService } from '../../date/v2/date.service';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/discipline-teacher.repository';
import { QuestionAnswerRepository } from '../../../database/v2/repositories/question-answer.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { StudentRepository } from '../../../database/v2/repositories/student.repository';
import { UserRepository } from '../../../database/v2/repositories/user.repository';
import { WrongTimeException } from '../../../common/exceptions/wrong-time.exception';
import { AlreadyAnsweredException } from '../../../common/exceptions/already-answered.exception';
import { NotEnoughAnswersException } from '../../../common/exceptions/not-enough-answers.exception';
import { ExcessiveAnswerException } from '../../../common/exceptions/excessive-answer.exception';
import { AnswerInDatabasePermissionException } from '../../../common/exceptions/answer-in-database-permission.exception';
import { InvalidEntityIdException } from '../../../common/exceptions/invalid-entity-id.exception';
import { NoPermissionException } from '../../../common/exceptions/no-permission.exception';
import { NotSelectedDisciplineException } from '../../../common/exceptions/not-selected-discipline.exception';
import { IsRemovedDisciplineTeacherException } from '../../../common/exceptions/is-removed-discipline-teacher.exception';
import { Prisma, QuestionType, State } from '@prisma/client/fictadvisor';
import { DbQuestion } from '../../../database/v2/entities/question.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbSubject } from '../../../database/v2/entities/subject.entity';
import { DbTeacher } from '../../../database/v2/entities/teacher.entity';

@Injectable()
export class DisciplineTeacherService {
  constructor (
    private dateService: DateService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineRepository: DisciplineRepository,
    private studentRepository: StudentRepository,
    private pollService: PollService,
    private questionAnswerRepository: QuestionAnswerRepository,
    private telegramApi: TelegramAPI,
    private userRepository: UserRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getQuestions (disciplineTeacherId: string, userId: string): Promise<DisciplineTeacherQuestionsResponse> {
    await this.checkAnswerInDatabase(disciplineTeacherId, userId);
    await this.checkSendingTime();

    return this.getCategories(disciplineTeacherId);
  }

  async sendAnswers (disciplineTeacherId: string, { answers }: CreateAnswersDTO, userId: string) {
    const questions = await this.getUniqueQuestions(disciplineTeacherId);
    await this.checkExcessiveQuestions(questions, answers);
    await this.checkRequiredQuestions(questions, answers);
    await this.checkAnsweredQuestions(disciplineTeacherId, answers, userId);
    await this.checkIsRemoved(disciplineTeacherId, userId);
    await this.checkIsUnique(answers);
    await this.checkSendingTime();

    const user = await this.userRepository.findOne({ id: userId });
    if (user.state !== State.APPROVED) {
      throw new NoPermissionException();
    }

    const { teacher, discipline } = await this.disciplineTeacherRepository.findOne({ id: disciplineTeacherId });

    if (await this.isNotSelectedByUser(userId, discipline)) {
      throw new NotSelectedDisciplineException();
    }

    const previousSemester = await this.dateService.isPreviousSemesterToCurrent(discipline.semester, discipline.year);
    if (!previousSemester) {
      throw new WrongTimeException();
    }

    for (const answer of answers) {
      const { type } = questions.find((q) => q.id === answer.questionId);
      if (type === QuestionType.TEXT) {
        await this.telegramApi.verifyResponse({
          disciplineTeacherId,
          subject: discipline.subject.name,
          teacherName: teacher.firstName + ' ' + teacher.middleName + ' ' + teacher.lastName,
          userId,
          response: answer.value,
          questionId: answer.questionId,
        });
      } else {
        await this.questionAnswerRepository.create({
          disciplineTeacherId,
          userId,
          ...answer,
        });
      }
    }
  }

  async sendResponse (disciplineTeacherId: string, response: ResponseDTO) {
    return this.questionAnswerRepository.create({
      disciplineTeacherId,
      ...response,
    });
  }

  async getCategories (id: string) {
    const { discipline, teacher } = await this.disciplineTeacherRepository.findOne({ id });
    const questions = await this.getUniqueQuestions(id);
    const categories = this.sortByCategories(questions);
    return {
      teacher: this.mapper.map(teacher, DbTeacher, TeacherResponse),
      subject: this.mapper.map(discipline.subject, DbSubject, SubjectResponse),
      categories,
    };
  }

  sortByCategories (questions: DbQuestion[]) {
    const results = [];
    for (const q of questions) {
      const question = this.mapper.map(q, DbQuestion, QuestionWithCategoryResponse);
      const name = question.category;
      delete question.category;
      const category = results.find((c) => (c.name === name));
      if (!category) {
        results.push({
          name: name,
          count: 1,
          questions: [question],
        });
      } else {
        category.count++;
        category.questions.push(question);
      }
    }
    return results;
  }

  async getUniqueQuestions (id: string) {
    const { disciplineTeachers } = await this.disciplineRepository.findOne({
      disciplineTeachers: {
        some: {
          id,
        },
      },
    });

    const teacherRoles = disciplineTeachers
      .find((disciplineTeacher) => disciplineTeacher.id === id)
      .roles.map(({ disciplineType }) => disciplineType.name as DisciplineTypeEnum);

    const disciplineTypes = new Set<DisciplineTypeEnum>();
    for (const { roles } of disciplineTeachers) {
      for (const { disciplineType } of roles) {
        disciplineTypes.add(disciplineType.name as DisciplineTypeEnum);
      }
    }

    return this.pollService.getQuestions(teacherRoles, Array.from(disciplineTypes));
  }

  async checkRequiredQuestions (dbQuestions: DbQuestion[], questions: CreateAnswerDTO[]) {
    for (const question of dbQuestions) {
      if (question.isRequired && !questions.some((q) => q.questionId === question.id)) {
        throw new NotEnoughAnswersException();
      }
    }
  }

  async checkExcessiveQuestions (dbQuestions: DbQuestion[], questions: CreateAnswerDTO[]) {
    for (const question of questions) {
      if (!dbQuestions.some((q) => (q.id === question.questionId))) {
        throw new ExcessiveAnswerException();
      }
    }
  }

  async checkIsUnique (answers: CreateAnswerDTO[]) {
    const questionIds = answers.map((answer) => answer.questionId);
    if (!isArrayUnique(questionIds)) {
      throw new ExcessiveAnswerException();
    }
  }

  async checkIsRemoved (disciplineTeacherId: string, userId: string) {
    const isRemoved = await this.disciplineTeacherRepository.findOne({
      id: disciplineTeacherId,
      removedDisciplineTeachers: {
        some: {
          studentId: userId,
        },
      },
    });
    if (isRemoved) {
      throw new IsRemovedDisciplineTeacherException();
    }
  }

  async checkAnsweredQuestions (disciplineTeacherId: string, answers: CreateAnswerDTO[], userId: string) {
    for (const answer of answers) {
      await this.checkAnsweredQuestion(disciplineTeacherId, answer.questionId, userId);
    }
  }

  async checkAnsweredQuestion (disciplineTeacherId: string, questionId: string, userId: string) {
    const dbAnswer = await this.questionAnswerRepository.find({
      disciplineTeacherId,
      userId,
      questionId,
    });
    if (dbAnswer) {
      throw new AlreadyAnsweredException(questionId);
    }
  }

  async getPollTimeBorders () {
    const { year, semester, isFinished } = await this.dateService.getCurrentSemester();
    let startPollName: string, endPollName: string;
    if (isFinished) {
      startPollName = `START_POLL_${year}_${semester}`;
      endPollName = `END_POLL_${year}_${semester}`;
    } else {
      const previous = this.dateService.getPreviousSemester(semester, year);
      startPollName = `START_POLL_${previous.year}_${previous.semester}`;
      endPollName = `END_POLL_${previous.year}_${previous.semester}`;
    }
    const startPoll = await this.dateService.getDateVar(startPollName);
    const endPoll = await this.dateService.getDateVar(endPollName);
    return {
      startPoll,
      endPoll,
    };
  }

  async checkSendingTime () {
    const dateBorders = await this.getPollTimeBorders();
    const openingPollTime = dateBorders.startPoll.getTime();
    const closingPollTime = dateBorders.endPoll.getTime();
    const currentTime = new Date().getTime();

    if (currentTime > closingPollTime || currentTime < openingPollTime) {
      throw new WrongTimeException();
    }
  }

  async checkAnswerInDatabase (disciplineTeacherId: string, userId: string) {
    const answers = await this.questionAnswerRepository.findMany({
      disciplineTeacherId,
      userId,
    });
    if (answers.length !== 0) {
      throw new AnswerInDatabasePermissionException();
    }
  }

  async create (teacherId: string, disciplineId: string, roles: DisciplineTypeEnum[]) {
    const discipline = await this.disciplineRepository.findOne({ id: disciplineId });
    const dbRoles = await this.getDbRoles(discipline, roles);

    return this.disciplineTeacherRepository.create({
      teacherId,
      disciplineId,
      roles: { create: dbRoles },
    });
  }

  async updateById (disciplineTeacherId: string, roles: DisciplineTypeEnum[]) {
    const discipline = await this.disciplineRepository.findOne({
      disciplineTeachers: {
        some: {
          id: disciplineTeacherId,
        },
      },
    });
    const dbRoles = await this.getDbRoles(discipline, roles);

    return this.disciplineTeacherRepository.updateById(disciplineTeacherId, {
      roles: {
        deleteMany: {},
        create: dbRoles,
      },
    });
  }

  private async getDbRoles (discipline: DbDiscipline, disciplineTypes: DisciplineTypeEnum[]) {
    const dbRoles = [];
    for (const disciplineType of disciplineTypes) {
      if (!discipline.disciplineTypes.some((type) => type.name === disciplineType)) {
        discipline = await this.disciplineRepository.updateById(discipline.id, {
          disciplineTypes: {
            create: {
              name: disciplineType,
            },
          },
        });
      }

      const { id } = discipline.disciplineTypes.find((dt) => dt.name === disciplineType);

      dbRoles.push({
        disciplineTypeId: id,
      });
    }

    return dbRoles;
  }

  async updateByTeacherAndDiscipline (teacherId: string, disciplineId: string, disciplineTypes: DisciplineTypeEnum[]) {
    let disciplineTeacher = await this.disciplineTeacherRepository.findOne({ teacherId, disciplineId });
    if (!disciplineTeacher) {
      disciplineTeacher = await this.disciplineTeacherRepository.create({
        teacherId: teacherId,
        disciplineId: disciplineId,
      });
    }
    return this.updateById(disciplineTeacher.id, disciplineTypes);
  }

  async deleteById (disciplineTeacherId: string) {
    await this.disciplineTeacherRepository.deleteById(disciplineTeacherId);
  }

  async deleteByTeacherAndDiscipline (teacherId: string, disciplineId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.findOne({ teacherId, disciplineId });
    if (!disciplineTeacher) {
      throw new InvalidEntityIdException('DisciplineTeacher');
    }
    await this.disciplineTeacherRepository.deleteById(disciplineTeacher.id);
  }

  async isNotSelectedByUser (userId: string, { id, year, semester, isSelective }: DbDiscipline) {
    if (!isSelective) return false;

    const { selectiveDisciplines } = await this.studentRepository.findOne({ userId });

    const relevantSelectiveDisciplines = selectiveDisciplines.filter((selective) => {
      return selective.discipline.year === year && selective.discipline.semester === semester;
    });

    return relevantSelectiveDisciplines.length && !relevantSelectiveDisciplines.some(({ disciplineId }) => disciplineId === id);
  }

  async removeFromPoll (disciplineTeacherId: string, userId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.findOne({ id: disciplineTeacherId });

    if (await this.isNotSelectedByUser(userId, disciplineTeacher.discipline)) {
      throw new NotSelectedDisciplineException();
    }

    await this.disciplineTeacherRepository.updateById(disciplineTeacherId, {
      removedDisciplineTeachers: {
        upsert: {
          where: {
            disciplineTeacherId_studentId: {
              disciplineTeacherId: disciplineTeacher.id,
              studentId: userId,
            },
          },
          create: {
            studentId: userId,
          },
          update: {},
        },
      },
    });
  }

  async getAllComments (query: QueryAllCommentsDTO): Promise<PaginatedData<DbQuestionAnswer>> {
    const { sort = CommentsSortBy.SUBJECT, order } = query;

    const data: PaginateArgs<'questionAnswer'> = {
      where: {
        AND: [
          { question: { type: QuestionType.TEXT } },
          this.CommentsSearching.semesters(query.semesters),
          this.CommentsSearching.comment(query.search),
        ],
      },
      orderBy: this.CommentsSorting[sort](order),
    };

    return PaginationUtil.paginate<'questionAnswer', DbQuestionAnswer>(this.questionAnswerRepository, query, data);
  }

  private CommentsSearching = {
    semesters: (semesters: QuerySemesterDTO[]) => ({
      disciplineTeacher: { discipline: DatabaseUtils.getSearchByArray(semesters, 'year', 'semester') },
    }),
    comment: (comment: string) => (DatabaseUtils.getSearch({ search: comment }, 'value')),
  };

  private CommentsSorting = {
    subject: (order: Prisma.SortOrder = 'asc') => ({
      disciplineTeacher: { discipline: { subject: { name: order } } },
    }),
    teacher: (order: Prisma.SortOrder = 'asc') => ([
      { disciplineTeacher: { teacher: { lastName: order } } },
      { disciplineTeacher: { teacher: { firstName: order } } },
      { disciplineTeacher: { teacher: { middleName: order } } },
    ]),
    semester: (order: Prisma.SortOrder = 'desc') => ([
      { disciplineTeacher: { discipline: { year: order } } },
      { disciplineTeacher: { discipline: { semester: order } } },
    ]),
  };

  async updateComment (
    disciplineTeacherId_questionId_userId: Prisma.QuestionAnswerDisciplineTeacherIdQuestionIdUserIdCompoundUniqueInput,
    value: string,
  ): Promise<DbQuestionAnswer> {
    return this.questionAnswerRepository.update(
      { disciplineTeacherId_questionId_userId },
      { value },
    );
  }

  async deleteQuestionAnswer (
    disciplineTeacherId_questionId_userId: Prisma.QuestionAnswerDisciplineTeacherIdQuestionIdUserIdCompoundUniqueInput,
  ): Promise<DbQuestionAnswer> {
    return this.questionAnswerRepository.delete({ disciplineTeacherId_questionId_userId });
  }
}
