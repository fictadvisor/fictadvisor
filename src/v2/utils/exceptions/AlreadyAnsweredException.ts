import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyAnsweredException extends HttpException {
  constructor(questionId: string) {
    super(`This question is already answered: ${questionId}`, HttpStatus.BAD_REQUEST);
  }
}