import { HttpException, HttpStatus } from '@nestjs/common';

export class NotBelongToGroupException extends HttpException {
  constructor () {
    super('Discipline does not belong to this group', HttpStatus.BAD_REQUEST);
  }
}