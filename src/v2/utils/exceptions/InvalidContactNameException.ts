import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidContactNameException extends HttpException {
  constructor () {
    super('Contact with such name is not found', HttpStatus.BAD_REQUEST);
  }
}