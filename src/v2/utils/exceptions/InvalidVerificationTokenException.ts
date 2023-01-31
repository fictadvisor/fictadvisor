import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidVerificationTokenException extends HttpException {
  constructor() {
    super('Verification token is expired or invalid', HttpStatus.BAD_REQUEST);
  }
}