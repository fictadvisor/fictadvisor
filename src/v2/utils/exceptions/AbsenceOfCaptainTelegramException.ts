import { HttpException, HttpStatus } from '@nestjs/common';

export class AbsenceOfCaptainTelegramException extends HttpException {
  constructor () {
    super('Captain\'s telegramId was not found', HttpStatus.BAD_REQUEST);
  }
}