import { HttpException, HttpStatus } from '@nestjs/common';

export class IsRemovedDisciplineTeacherException extends HttpException {
  constructor () {
    super('The discipline teacher is removed from the poll', HttpStatus.BAD_REQUEST);
  }
}