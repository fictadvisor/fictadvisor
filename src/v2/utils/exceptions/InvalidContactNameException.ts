import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidContactNameException extends HttpException {
  constructor () {
    super('сontact with such name is not found', HttpStatus.BAD_REQUEST);
  }
}
