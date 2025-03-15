import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistException extends HttpException {
  constructor (object: string) {
    super(`${object} already exist`, HttpStatus.BAD_REQUEST);
  }
}