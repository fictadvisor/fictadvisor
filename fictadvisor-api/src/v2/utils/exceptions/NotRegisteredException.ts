import { HttpException, HttpStatus } from '@nestjs/common';

export class NotRegisteredException extends HttpException {
  constructor () {
    super('This email is not registered yet', HttpStatus.BAD_REQUEST);
  }
}