import { HttpException, HttpStatus } from '@nestjs/common';

export class AnswerInDatabasePermissionException extends HttpException {
  constructor () {
    super('You don`t have access, because you`ve already answered', HttpStatus.FORBIDDEN);
  }
}