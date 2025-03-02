import { HttpException, HttpStatus } from '@nestjs/common';

export class NullObjectException extends HttpException {
  constructor (object: string) {
    super(`${object} is null`, HttpStatus.BAD_REQUEST);
  }
}