import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeService } from '../discipline/DisciplineTypeService';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';
import { PollService } from "../poll/PollService";
import { CreateAnswersDTO } from "./dto/CreateAnswersDTO";
import { QuestionAnswerRepository } from "../poll/QuestionAnswerRepository";
import { User } from "@prisma/client";
import { AlreadyAnsweredException } from "../../utils/exceptions/AlreadyAnsweredException";
import { DisciplineService } from "../discipline/DisciplineService";

@Injectable()
export class DisciplineTeacherService {
  constructor(
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    @Inject(forwardRef(() => DisciplineTypeService))
    private disciplineTypeService: DisciplineTypeService,
    private pollService: PollService,
    private questionAnswerRepository: QuestionAnswerRepository,

    private disciplineService: DisciplineService,
  ) {}

  async getGroup(id: string) {
    const discipline = await this.disciplineTeacherRepository.getDiscipline(id);
    return this.disciplineService.getGroup(discipline.id);
  }

  async getDisciplineTeacher(disciplineTeacherId: string) {
    const teacher = await this.disciplineTeacherRepository.getTeacher(disciplineTeacherId);
    const roles = await this.disciplineTeacherRepository.getRoles(disciplineTeacherId);

    return {
      ...teacher,
      disciplineTeacherId,
      roles: roles.map((role) => (role.role)),
    };
  }

  getQuestions(disciplineTeacherId: string) {
    return this.pollService.getCategoriesByDisciplineTeacherId(disciplineTeacherId);
  }

  async sendAnswers(disciplineTeacherId: string, { answers }: CreateAnswersDTO, user: User) {
    await this.pollService.checkExcessiveQuestions(disciplineTeacherId, answers);
    await this.pollService.checkRequiredQuestions(disciplineTeacherId, answers);
    for (const answer of answers) {
      const dbAnswer = await this.questionAnswerRepository.find({
        disciplineTeacherId: disciplineTeacherId,
        userId: user.id,
        questionId: answer.questionId,
      });
      if(dbAnswer) {
        throw new AlreadyAnsweredException(answer.questionId);
      }
    }
    for (const answer of answers) {
      this.questionAnswerRepository.create({
        disciplineTeacherId: disciplineTeacherId,
        userId: user.id,
        ...answer,
      });
    }
  }
}
