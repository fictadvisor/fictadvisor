import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectIsRequiredException extends HttpException {
  constructor (object: string) {
    super(`${object} is required`, HttpStatus.BAD_REQUEST);
  }
}