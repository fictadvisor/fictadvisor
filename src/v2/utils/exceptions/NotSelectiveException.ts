import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSelectiveException extends HttpException {
  constructor () {
    super('This discipline is not selective', HttpStatus.BAD_REQUEST);
  }
}