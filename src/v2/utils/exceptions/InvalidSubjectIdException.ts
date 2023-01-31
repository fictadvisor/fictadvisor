import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSubjectIdException extends HttpException {
  constructor () {
    super('Subject with such id is not found', HttpStatus.BAD_REQUEST);
  }
}
