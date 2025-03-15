import { HttpException, HttpStatus } from '@nestjs/common';

export class NotApprovedException extends HttpException {
  constructor () {
    super('Student is not approved', HttpStatus.FORBIDDEN);
  }
}