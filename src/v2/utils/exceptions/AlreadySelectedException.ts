import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadySelectedException extends HttpException {
  constructor () {
    super('You have already selected this disciplines', HttpStatus.BAD_REQUEST);
  }
}