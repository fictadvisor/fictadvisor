import { HttpException, HttpStatus } from '@nestjs/common';

export class AbsenceOfCaptainException extends HttpException {
  constructor () {
    super('Captain was not found', HttpStatus.BAD_REQUEST);
  }
}