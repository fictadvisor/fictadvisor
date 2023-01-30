import { Injectable, PipeTransform } from "@nestjs/common";
import { PollController } from "../PollController";
import { Question } from "@prisma/client";
import { InvalidEntityIdException } from "../../../utils/exceptions/InvalidEntityIdException";
import { PollService } from "../PollService";

@Injectable()
export class QuestionByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor(
    private pollService: PollService,
  ) {}

  async transform(questionId: string): Promise<string> {
    const question : Question = await this.pollService.getQuestion(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    return questionId;
  }
}