import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEducationProgramsException extends HttpException {
  constructor () {
    super('Education programs is invalid', HttpStatus.BAD_REQUEST);
  }
}