import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateAnswerDTO, CreateAnswersDTO } from '../teacher/dto/CreateAnswersDTO';
import { CreateQuestionsDTO } from "./dto/CreateQuestionDTO";
import { QuestionRepository } from "./QuestionRepository";
import { UpdateQuestionDTO } from "./dto/UpdateQuestionDTO";
import { QuestionRoleData } from "./dto/QuestionRoleData";
import { Question, TeacherRole } from "@prisma/client";
import { DisciplineRepository } from "../discipline/DisciplineRepository";
import { DisciplineTeacherRepository } from "../teacher/DisciplineTeacherRepository";
import { NotEnoughAnswersException } from "../../utils/exceptions/NotEnoughAnswersException";
import { ExcessiveAnswerException } from "../../utils/exceptions/ExcessiveAnswerException";
import { PollModule } from "./PollModule";
import { DisciplineService } from "../discipline/DisciplineService";



@Injectable()
export class PollService {
  constructor(
    private prisma: PrismaService,
    private questionRepository: QuestionRepository,

    private disciplineRepository: DisciplineRepository,
    @Inject(forwardRef(() => DisciplineTeacherRepository))
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ){}


  async createAnswers(userId: string, disciplineTeacherId: string, body: CreateAnswersDTO) {
    for (const answer of body.answers) {
      this.prisma.questionAnswer.create({
        data: {
          disciplineTeacherId,
          userId,
          ...answer,
        },
      });
    }
  }
  async createQuestions(body: CreateQuestionsDTO){
    const questions = [];
    for (const question of body.questions){
      questions.push(await this.questionRepository.create(question));
    }
    return {
      questions,
    };
  }

  async delete(id: string){
    await this.questionRepository.delete(id);
  }

  async update(id: string, body: UpdateQuestionDTO){
    await this.questionRepository.update(id, body);
  }

  async getQuestion(id: string){
    return await this.questionRepository.getQuestion(id);
  }

  async giveRole(body: QuestionRoleData, questionId: string){
    return await this.questionRepository.connectRole(questionId, body);
  }

  async deleteRole(questionId: string, role: TeacherRole){
    return await this.questionRepository.deleteRole(questionId, role);
  }

  async getQuestionsByRoles(roles: TeacherRole[]) {
    const results = [];
    for (const role of roles) {
      const roleQuestions = await this.questionRepository.getQuestionsByRole(role);
      results.push(...roleQuestions);
    }
    return results;
  }

  async getUnifyQuestionByRoles(roles: TeacherRole[]) {
    const questions = await this.getQuestionsByRoles(roles);
    return this.unifyQuestions(questions);
  }
  sortByCategories(questions: Question[]) {
    const results = [];
    for(const question of questions){
      const name = question.name;
      delete question.category;
      const category = results.find((c) => (c.name === name));
      if(!category){
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

  unifyQuestions(questions: Question[]){
    const results = [];
    for (const question of questions) {
      if (!results.some((q) => (q.id === question.id))) {
        results.push(question);
      }
    }
    return results;
  }

  async getCategoriesByDisciplineTeacherId(id: string) {
    const { disciplineId, teacher } = await this.disciplineTeacherRepository.get(id);
    const questions = await this.getUniqueQuestionsByDisciplineTeacherId(id);
    const subject = await this.disciplineRepository.getSubject(disciplineId);
    const categories = this.sortByCategories(questions);
    return {
      teacher: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
      subject : subject.name,
      categories,
    };
  }

  async getUniqueQuestionsByDisciplineTeacherId(id: string) {
    const roles = await this.disciplineTeacherRepository.getRoles(id);
    return this.getUnifyQuestionByRoles(roles.map((r) => r.role));
  }

  async checkRequiredQuestions(disciplineTeacherId: string, questions: CreateAnswerDTO[]) {
    const dbQuestions = await this.getUniqueQuestionsByDisciplineTeacherId(disciplineTeacherId);
    for (const question of dbQuestions) {
      if(question.isRequired && !questions.some((q) => q.questionId === question.id)) {
        throw new NotEnoughAnswersException();
      }
    }
  }

  async checkExcessiveQuestions(disciplineTeacherId: string, questions: CreateAnswerDTO[]) {
    const dbQuestions = await this.getUniqueQuestionsByDisciplineTeacherId(disciplineTeacherId);
    for (const question of questions) {
      if(!dbQuestions.some((q) => (q.questionId === question.questionId))) {
        throw new ExcessiveAnswerException();
      }
    }
  }
}
