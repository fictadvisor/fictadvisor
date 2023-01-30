import { PipeTransform } from "@nestjs/common";
import { PollController } from "../PollController";
import { TeacherRole } from "@prisma/client";
import { InvalidEntityIdException } from "../../../utils/exceptions/InvalidEntityIdException";
import { QuestionRepository } from "../QuestionRepository";

export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor(
    private questionRepository: QuestionRepository,
    private pollController: PollController,
  ) {}

  async transform(params: {questionId: string, role: TeacherRole}) {
    const { questionId, role } = params;
    const question = await this.pollController.getQuestion(questionId);
    if(!question) {
      throw new InvalidEntityIdException('question');
    }
    const questionRole = await this.questionRepository.getQuestionRole(questionId, role);
    if(!questionRole) {
      throw new InvalidEntityIdException('questionRole');
    }
    return params;
  }
}