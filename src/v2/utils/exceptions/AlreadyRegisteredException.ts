import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyRegisteredException extends HttpException {
  constructor () {
    super('User is already registered', HttpStatus.BAD_REQUEST);
  }
}