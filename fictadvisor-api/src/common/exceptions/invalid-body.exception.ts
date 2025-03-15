import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBodyException extends HttpException {
  constructor (errors: string[]) {
    super({ messages: errors }, HttpStatus.BAD_REQUEST);
  }
}
