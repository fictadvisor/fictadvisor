import { Injectable, PipeTransform } from "@nestjs/common";
import { PollController } from "../PollController";
import { Question } from "@prisma/client";
import { InvalidEntityIdException } from "../../../utils/exceptions/InvalidEntityIdException";

@Injectable()
export class QuestionByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor(
    private pollController: PollController,
  ) {}

  async transform(questionId: string): Promise<string> {
    const question : Question = await this.pollController.getQuestion(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    return questionId;
  }
}