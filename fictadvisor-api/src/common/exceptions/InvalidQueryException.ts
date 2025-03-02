import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidQueryException extends HttpException {
  constructor () {
    super('Query parameter/s is/are invalid', HttpStatus.BAD_REQUEST);
  }
}