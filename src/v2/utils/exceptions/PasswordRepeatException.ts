import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordRepeatException extends HttpException {
  constructor() {
    super('The passwords are the same ', HttpStatus.BAD_REQUEST);
  }
}