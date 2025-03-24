import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateTelegramIdException extends HttpException {
  constructor () {
    super('A user with the same Telegram ID already exists', HttpStatus.CONFLICT);
  }
}