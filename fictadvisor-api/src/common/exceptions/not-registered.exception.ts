import { HttpException, HttpStatus } from '@nestjs/common';

export class NotRegisteredException extends HttpException {
  constructor (field: string) {
    super(`User with such ${field} is not registered yet`, HttpStatus.BAD_REQUEST);
  }
}