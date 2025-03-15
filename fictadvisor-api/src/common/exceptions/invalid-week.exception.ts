import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidWeekException extends HttpException {
  constructor () {
    super('Week parameter is invalid', HttpStatus.BAD_REQUEST);
  }
}