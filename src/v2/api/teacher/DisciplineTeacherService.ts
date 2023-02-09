import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeService } from '../discipline/DisciplineTypeService';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { PollService } from "../poll/PollService";
import { CreateAnswerDTO, CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { QuestionAnswerRepository } from "../poll/QuestionAnswerRepository";
import { User } from "@prisma/client";
import { AlreadyAnsweredException } from "../../utils/exceptions/AlreadyAnsweredException";
import { DisciplineService } from "../discipline/DisciplineService";
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { DisciplineTeacherWithRoles } from "./DisciplineTeacherDatas";

@Injectable()
export class DisciplineTeacherService {
  constructor(
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => DisciplineTypeService))
    private disciplineTypeService: DisciplineTypeService,
    @Inject(forwardRef(() => PollService))
    private pollService: PollService,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineRepository: DisciplineRepository,
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService,
  ) {}

  async getGroup(id: string) {
    const discipline = await this.disciplineTeacherRepository.getDiscipline(id);
    return discipline.group;
  }

  async getDisciplineTeacher(id: string) {
    const { teacher, roles, id: disciplineTeacherId } = await this.disciplineTeacherRepository.getDisciplineTeacher(id);

    return {
      ...teacher,
      disciplineTeacherId,
      roles: roles.map((r) => (r.role)),
    };
  }

  getUniqueRoles(disciplineTeachers: DisciplineTeacherWithRoles[]) {
    const roles = [];
    for (const disciplineTeacher of disciplineTeachers) {
      const dbRoles = disciplineTeacher.roles
        .map((r) => r.role)
        .filter((r) => !roles.includes(r));

      roles.push(...dbRoles);
    }

    return roles;
  }

  getQuestions(disciplineTeacherId: string) {
    return this.getCategories(disciplineTeacherId);
  }

  async sendAnswers(disciplineTeacherId: string, { answers }: CreateAnswersDTO, user: User) {
    await this.checkExcessiveQuestions(disciplineTeacherId, answers);
    await this.checkRequiredQuestions(disciplineTeacherId, answers);
    await this.checkAnsweredQuestions(disciplineTeacherId, answers, user.id);

    for (const answer of answers) {
      this.questionAnswerRepository.create({
        disciplineTeacherId: disciplineTeacherId,
        userId: user.id,
        ...answer,
      });
    }
  }

  async getCategories(id: string) {
    const { disciplineId, teacher } = await this.disciplineTeacherRepository.get(id);
    const questions = await this.getUniqueQuestions(id);
    const subject = await this.disciplineRepository.getSubject(disciplineId);
    const categories = this.pollService.sortByCategories(questions);
    return {
      teacher: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
      subject : subject.name,
      categories,
    };
  }

  async getUniqueQuestions(id: string) {
    const roles = await this.disciplineTeacherRepository.getRoles(id);
    return this.pollService.getUnifyQuestionByRoles(roles.map((r) => r.role));
  }

  async checkRequiredQuestions(disciplineTeacherId: string, questions: CreateAnswerDTO[]) {
    const dbQuestions = await this.getUniqueQuestions(disciplineTeacherId);
    for (const question of dbQuestions) {
      if(question.isRequired && !questions.some((q) => q.questionId === question.id)) {
        throw new NotEnoughAnswersException();
      }
    }
  }

  async checkExcessiveQuestions(disciplineTeacherId: string, questions: CreateAnswerDTO[]) {
    const dbQuestions = await this.getUniqueQuestions(disciplineTeacherId);
    for (const question of questions) {
      if(!dbQuestions.some((q) => (q.questionId === question.questionId))) {
        throw new ExcessiveAnswerException();
      }
    }
  }

  async checkAnsweredQuestions(disciplineTeacherId: string, answers: CreateAnswerDTO[], userId: string) {
    for (const answer of answers) {
      await this.checkAnsweredQuestion(disciplineTeacherId, answer.questionId, userId);
    }
  }

  async checkAnsweredQuestion(disciplineTeacherId: string, questionId: string, userId: string) {
    const dbAnswer = await this.questionAnswerRepository.find({
      disciplineTeacherId,
      userId,
      questionId,
    });
    if(dbAnswer) {
      throw new AlreadyAnsweredException(questionId);
    }
  }
}
