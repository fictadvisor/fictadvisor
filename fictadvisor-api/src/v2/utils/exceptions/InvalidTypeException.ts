import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTypeException extends HttpException {
  constructor (entity: string) {
    super(`${entity} has wrong type`, HttpStatus.BAD_REQUEST);
  }
}