import { HttpException, HttpStatus } from "@nestjs/common";

export class ExcessiveAnswerException extends HttpException{
  constructor() {
    super('There are excessive answers in the request', HttpStatus.BAD_REQUEST);
  }
}