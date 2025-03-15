import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSelectedDisciplineException extends HttpException {
  constructor () {
    super('Current discipline is not selected by this student', HttpStatus.BAD_REQUEST);
  }
}
