import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTelegramCredentialsException extends HttpException {
  constructor () {
    super('Your telegram hash is invalid', HttpStatus.UNAUTHORIZED);
  }
}
