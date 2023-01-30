import { HttpException, HttpStatus } from "@nestjs/common";

export class ExcessiveAnswerException extends HttpException{
  constructor() {
    super('', HttpStatus.BAD_REQUEST);
  }
}