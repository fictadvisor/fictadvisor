import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDayException extends HttpException {
  constructor () {
    super('Day parameter is invalid', HttpStatus.BAD_REQUEST);
  }
}
