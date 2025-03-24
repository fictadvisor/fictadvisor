import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidValueException extends HttpException {
  constructor () {
    super('Value is wrong', HttpStatus.BAD_REQUEST);
  }
}