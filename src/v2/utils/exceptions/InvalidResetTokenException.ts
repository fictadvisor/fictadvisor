import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidResetTokenException extends HttpException {
  constructor() {
    super('Reset token is expired or invalid', HttpStatus.BAD_REQUEST);
  }
}