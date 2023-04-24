import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { PollService } from '../poll/PollService';
import { CreateAnswerDTO, CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { QuestionAnswerRepository } from '../poll/QuestionAnswerRepository';
import { QuestionType, State, TeacherRole } from '@prisma/client';
import { AlreadyAnsweredException } from '../../utils/exceptions/AlreadyAnsweredException';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { DateService } from '../../utils/date/DateService';
import { WrongTimeException } from '../../utils/exceptions/WrongTimeException';
import { DisciplineTeacherWithRoles, DisciplineTeacherWithRolesAndTeacher } from './DisciplineTeacherDatas';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { ResponseDTO } from '../poll/dto/ResponseDTO';
import { checkIfArrayIsUnique } from '../../utils/ArrayUtil';
import { AnswerInDatabasePermissionException } from '../../utils/exceptions/AnswerInDatabasePermissionException';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { TeacherTypeAdapter } from './dto/TeacherRoleAdapter';
import { DbQuestion } from './DbQuestion';
import { UserRepository } from '../user/UserRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
@Injectable()
export class DisciplineTeacherService {
  constructor (
    private dateService: DateService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => PollService))
    private pollService: PollService,
    private questionAnswerRepository: QuestionAnswerRepository,
    private telegramApi: TelegramAPI,
    private userRepository: UserRepository
  ) {}

  async getGroup (id: string) {
    const discipline = await this.disciplineTeacherRepository.getDiscipline(id);
    return discipline.group;
  }

  async getDisciplineTeacher (id: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.getDisciplineTeacher(id);

    return this.formatTeacher(disciplineTeacher);
  }

  getUniqueRoles (disciplineTeachers: DisciplineTeacherWithRoles[]): TeacherRole[] {
    const roles = [];
    for (const disciplineTeacher of disciplineTeachers) {
      const dbRoles = disciplineTeacher.roles
        .map((r) => r.role)
        .filter((r) => !roles.includes(r));

      roles.push(...dbRoles);
    }

    return roles;
  }

  getTeachers (teachers: DisciplineTeacherWithRolesAndTeacher[]) {
    return teachers.map(this.formatTeacher);
  }

  formatTeacher (teacher: DisciplineTeacherWithRolesAndTeacher) {
    return {
      disciplineTeacherId: teacher.id,
      ...teacher.teacher,
      roles: teacher.roles.map((r) => (r.role)),
    };
  }

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
    await this.checkIsUnique(answers);
    await this.checkSendingTime();

    const user = await this.userRepository.findById(userId);
    if (user.state !== State.APPROVED) {
      throw new NoPermissionException();
    }

    const { teacher, discipline } = await this.disciplineTeacherRepository.getDisciplineTeacher(disciplineTeacherId);

    const previousSemester = await this.dateService.isPreviousSemester(discipline.semester, discipline.year);
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
    const { discipline, teacher } = await this.disciplineTeacherRepository.getDisciplineTeacher(id);
    const questions = await this.getUniqueQuestions(id);
    const categories = this.pollService.sortByCategories(questions);
    return {
      teacher,
      subject: discipline.subject,
      categories,
    };
  }

  async getUniqueQuestions (id: string) {
    const { disciplineTeachers } = await this.disciplineTeacherRepository.getDiscipline(id);

    const teacherRoles = disciplineTeachers
      .find((dt) => dt.id === id)
      .roles.map((r) => r.role);
    const disciplineRoles = this.getUniqueRoles(disciplineTeachers);

    return this.disciplineTeacherRepository.getQuestions(teacherRoles, disciplineRoles);
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
    if (!checkIfArrayIsUnique(questionIds)) {
      throw new ExcessiveAnswerException();
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
    const { year, semester } = await this.dateService.getCurrentSemester();
    const startPoll = await this.dateService.getDateVar(`START_POLL_${year}_${semester}`);
    const endPoll = await this.dateService.getDateVar(`END_POLL_${year}_${semester}`);
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
    const answers = await this.questionAnswerRepository.findMany(disciplineTeacherId, userId);
    if (answers.length !== 0) {
      throw new AnswerInDatabasePermissionException();
    }
  }

  async create (teacherId: string, disciplineId: string, roles: TeacherRole[]) {
    const discipline = await this.disciplineRepository.findById(disciplineId);
    const dbRoles = [];
    for (const role of roles) {
      let disciplineType = discipline.disciplineTypes.find((dt) => dt.name === TeacherTypeAdapter[role]);
      if (!disciplineType) {
        disciplineType = await this.disciplineTypeRepository.create({
          disciplineId: discipline.id,
          name: TeacherTypeAdapter[role],
        });
      }

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
    const discipline = await this.disciplineRepository.findBy({
      disciplineTeachers: {
        some: {
          id: disciplineTeacherId,
        },
      },
    });
    const dbRoles = [];
    for (const role of roles) {
      let disciplineType = discipline.disciplineTypes.find((dt) => dt.name === TeacherTypeAdapter[role]);
      if (!disciplineType) {
        disciplineType = await this.disciplineTypeRepository.create({
          disciplineId: discipline.id,
          name: TeacherTypeAdapter[role],
        });
      }

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

  async getUserDisciplineTeachers (teacherId: string, userId: string) {
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
      },
    });
  }
}
