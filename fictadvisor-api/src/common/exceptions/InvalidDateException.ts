import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDateException extends HttpException {
  constructor () {
    super('Date is not valid or does not belong to this semester', HttpStatus.BAD_REQUEST);
  }
}