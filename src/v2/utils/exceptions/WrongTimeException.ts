import { HttpException, HttpStatus } from "@nestjs/common";

export class WrongTimeException extends HttpException {
  constructor() {
    super('Your answer has been sent too late or too early', HttpStatus.FORBIDDEN);
  }
}