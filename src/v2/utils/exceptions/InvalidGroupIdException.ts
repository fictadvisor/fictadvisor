import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidGroupIdException extends HttpException {
  constructor () {
    super('Group with such id is not found', HttpStatus.BAD_REQUEST);
  }
}
