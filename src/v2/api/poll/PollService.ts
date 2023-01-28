import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { CreateQuestionsDTO } from "./dto/CreateQuestionDTO";
import {QuestionRepository} from "./QuestionRepository";
import {UpdateQuestionDTO} from "./dto/UpdateQuestionDTO";
import {QuestionRoleData} from "./dto/QuestionRoleData";
import {TeacherRole} from "@prisma/client";

@Injectable()
export class PollService {
  constructor(
    private prisma: PrismaService,
    private questionRepository: QuestionRepository,
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
}