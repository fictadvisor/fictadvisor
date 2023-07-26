import { Injectable } from '@nestjs/common';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { PollService } from './PollService';
import { CreateAnswerDTO, CreateAnswersDTO } from '../dtos/CreateAnswersDTO';
import { QuestionAnswerRepository } from '../../database/repositories/QuestionAnswerRepository';
import { Discipline, QuestionType, State, TeacherRole } from '@prisma/client';
import { AlreadyAnsweredException } from '../../utils/exceptions/AlreadyAnsweredException';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { DateService } from '../../utils/date/DateService';
import { WrongTimeException } from '../../utils/exceptions/WrongTimeException';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { ResponseDTO } from '../dtos/ResponseDTO';
import { checkIfArrayIsUnique } from '../../utils/ArrayUtil';
import { AnswerInDatabasePermissionException } from '../../utils/exceptions/AnswerInDatabasePermissionException';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { TeacherTypeAdapter } from '../dtos/TeacherRoleAdapter';
import { UserRepository } from '../../database/repositories/UserRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DbQuestionWithRoles } from '../../database/entities/DbQuestionWithRoles';
import { NotSelectedDisciplineException } from '../../utils/exceptions/NotSelectedDisciplineException';
import { IsRemovedDisciplineTeacherException } from '../../utils/exceptions/IsRemovedDisciplineTeacherException';

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
    private questionMapper: QuestionMapper,
  ) {}

  async getQuestions (disciplineTeacherId: string, userId: string) {
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

    const user = await this.userRepository.findById(userId);
    if (user.state !== State.APPROVED) {
      throw new NoPermissionException();
    }

    const { teacher, discipline } = await this.disciplineTeacherRepository.findById(disciplineTeacherId);

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
    const { discipline, teacher } = await this.disciplineTeacherRepository.findById(id);
    const questions = await this.getUniqueQuestions(id);
    const categories = this.questionMapper.sortByCategories(questions);
    return {
      teacher,
      subject: discipline.subject,
      categories,
    };
  }

  async getUniqueQuestions (id: string) {
    const { disciplineTeachers } = await this.disciplineRepository.find({
      disciplineTeachers: {
        some: {
          id,
        },
      },
    });

    const teacherRoles = disciplineTeachers
      .find((dt) => dt.id === id)
      .roles.map((r) => r.role);

    const disciplineRoles = new Set<TeacherRole>();
    for (const dt of disciplineTeachers) {
      dt.roles.forEach((r) => disciplineRoles.add(r.role));
    }

    return this.pollService.getQuestions(teacherRoles, Array.from(disciplineRoles));
  }

  async checkRequiredQuestions (dbQuestions: DbQuestionWithRoles[], questions: CreateAnswerDTO[]) {
    for (const question of dbQuestions) {
      if (question.isRequired && !questions.some((q) => q.questionId === question.id)) {
        throw new NotEnoughAnswersException();
      }
    }
  }

  async checkExcessiveQuestions (dbQuestions: DbQuestionWithRoles[], questions: CreateAnswerDTO[]) {
    for (const question of questions) {
      if (!dbQuestions.some((q) => (q.id === question.questionId))) {
        throw new ExcessiveAnswerException();
      }
    }
  }

  async checkIsUnique (answers: CreateAnswerDTO[]) {
    const questionIds = answers.map((answer) => answer.questionId);
    if (!checkIfArrayIsUnique(questionIds)) {
      throw new ExcessiveAnswerException();
    }
  }

  async checkIsRemoved (disciplineTeacherId, userId) {
    const isRemoved = await this.disciplineTeacherRepository.find({
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
    let startPollName, endPollName;
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
      where: {
        disciplineTeacherId,
        userId,
      },
    });
    if (answers.length !== 0) {
      throw new AnswerInDatabasePermissionException();
    }
  }

  async create (teacherId: string, disciplineId: string, roles: TeacherRole[]) {
    let discipline = await this.disciplineRepository.findById(disciplineId);
    const dbRoles = [];
    for (const role of roles) {
      if (!discipline.disciplineTypes.some((type) => type.name === TeacherTypeAdapter[role])) {
        discipline = await this.disciplineRepository.updateById(discipline.id, {
          disciplineTypes: {
            create: {
              name: TeacherTypeAdapter[role],
            },
          },
        });
      }

      const disciplineType = discipline.disciplineTypes.find((dt) => dt.name === TeacherTypeAdapter[role]);

      dbRoles.push({
        role,
        disciplineTypeId: disciplineType.id,
      });
    }
    return this.disciplineTeacherRepository.create({
      teacherId: teacherId,
      disciplineId: disciplineId,
      roles: { create: dbRoles },
    });
  }

  async updateById (disciplineTeacherId: string, roles: TeacherRole[]) {
    let discipline = await this.disciplineRepository.find({
      disciplineTeachers: {
        some: {
          id: disciplineTeacherId,
        },
      },
    });
    const dbRoles = [];
    for (const role of roles) {
      if (!discipline.disciplineTypes.some((type) => type.name === TeacherTypeAdapter[role])) {
        discipline = await this.disciplineRepository.updateById(discipline.id, {
          disciplineTypes: {
            create: {
              name: TeacherTypeAdapter[role],
            },
          },
        });
      }

      const disciplineType = discipline.disciplineTypes.find((dt) => dt.name === TeacherTypeAdapter[role]);

      dbRoles.push({
        role,
        disciplineTypeId: disciplineType.id,
      });
    }
    return this.disciplineTeacherRepository.updateById(disciplineTeacherId, {
      roles: {
        deleteMany: {},
        create: dbRoles,
      },
    });
  }

  async updateByTeacherAndDiscipline (teacherId: string, disciplineId: string, roles: TeacherRole[]) {
    let disciplineTeacher = await this.disciplineTeacherRepository.find({ teacherId, disciplineId });
    if (!disciplineTeacher) {
      disciplineTeacher = await this.disciplineTeacherRepository.create({
        teacherId: teacherId,
        disciplineId: disciplineId,
      });
    }
    return this.updateById(disciplineTeacher.id, roles);
  }

  async deleteById (disciplineTeacherId: string) {
    await this.disciplineTeacherRepository.deleteById(disciplineTeacherId);
  }

  async deleteByTeacherAndDiscipline (teacherId: string, disciplineId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.find({ teacherId, disciplineId });
    if (!disciplineTeacher) {
      throw new InvalidEntityIdException('disciplineTeacher');
    }
    await this.disciplineTeacherRepository.deleteById(disciplineTeacher.id);
  }

  async isNotSelectedByUser (userId: string, { id, year, semester, isSelective }: Discipline) {
    if (!isSelective) return false;

    const { selectiveDisciplines } = await this.studentRepository.findById(userId);

    const relevantSelectiveDisciplines = selectiveDisciplines.filter((selective) => {
      return selective.discipline.year === year && selective.discipline.semester === semester;
    });

    return relevantSelectiveDisciplines.length && !relevantSelectiveDisciplines.some(({ disciplineId }) => disciplineId === id);
  }

  async removeFromPoll (disciplineTeacherId: string, userId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.findById(disciplineTeacherId);

    if (await this.isNotSelectedByUser(userId, disciplineTeacher.discipline)) {
      throw new NotSelectedDisciplineException();
    }

    await this.disciplineTeacherRepository.updateById(disciplineTeacherId, {
      removedDisciplineTeachers: {
        create: {
          studentId: userId,
        },
      },
    });
  }
}
