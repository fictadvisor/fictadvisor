import { HttpException, HttpStatus } from '@nestjs/common';

export class AnswerInDatabasePermissionException extends HttpException {
  constructor () {
    super('You do not have access, because you have already answered', HttpStatus.FORBIDDEN);
  }
}