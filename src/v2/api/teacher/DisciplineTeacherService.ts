import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeService } from '../discipline/DisciplineTypeService';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { PollService } from '../poll/PollService';
import { CreateAnswerDTO, CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { QuestionAnswerRepository } from '../poll/QuestionAnswerRepository';
import { Question, TeacherRole, User } from '@prisma/client';
import { AlreadyAnsweredException } from '../../utils/exceptions/AlreadyAnsweredException';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { DateService } from '../../utils/date/DateService';
import { PrismaService } from '../../database/PrismaService';
import { ConfigService } from '@nestjs/config';
import { WrongTimeException } from '../../utils/exceptions/WrongTimeException';
import { DisciplineTeacherWithRoles, DisciplineTeacherWithRolesAndTeacher } from './DisciplineTeacherDatas';

@Injectable()
export class DisciplineTeacherService {
  constructor (
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    private prisma: PrismaService,
    private dateService: DateService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => DisciplineTypeService))
    private disciplineTypeService: DisciplineTypeService,
    @Inject(forwardRef(() => PollService))
    private pollService: PollService,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineRepository: DisciplineRepository,
    private config: ConfigService,
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService,
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

  getQuestions (disciplineTeacherId: string) {
    return this.getCategories(disciplineTeacherId);
  }

  async sendAnswers (disciplineTeacherId: string, { answers }: CreateAnswersDTO, user: User) {
    const questions = await this.getUniqueQuestions(disciplineTeacherId);
    await this.checkExcessiveQuestions(questions, answers);
    await this.checkRequiredQuestions(questions, answers);
    await this.checkAnsweredQuestions(disciplineTeacherId, answers, user.id);
    await this.checkSendingTime();
    for (const answer of answers) {
      await this.questionAnswerRepository.create({
        disciplineTeacherId: disciplineTeacherId,
        userId: user.id,
        ...answer,
      });
    }
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

  async checkRequiredQuestions (dbQuestions: Question[], questions: CreateAnswerDTO[]) {
    for (const question of dbQuestions) {
      if (question.isRequired && !questions.some((q) => q.questionId === question.id)) {
        throw new NotEnoughAnswersException();
      }
    }
  }

  async checkExcessiveQuestions (dbQuestions: Question[], questions: CreateAnswerDTO[]) {
    for (const question of questions) {
      if (!dbQuestions.some((q) => (q.id === question.questionId))) {
        throw new ExcessiveAnswerException();
      }
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
    const { year, semester } = await this.dateService.getCurrentYearAndSemester();
    const startPoll = await this.dateService.getDateVar(`START_POLL_${year}_${semester}`);
    const endPoll = await this.dateService.getDateVar(`END_POLL_${year}_${semester}`);
    return {
      startPoll,
      endPoll,
    };
  }
  async checkSendingTime () {
    const dateBorders = await this.getPollTimeBorders();
    const closingPollTime = dateBorders.startPoll.getTime();
    const openingPollTime = dateBorders.endPoll.getTime();
    const currentTime = new Date().getTime();

    if (currentTime < closingPollTime || currentTime > openingPollTime) {
      throw new WrongTimeException();
    }
  }
}
