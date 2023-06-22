import { HttpException, HttpStatus } from '@nestjs/common';

export class ExcessiveSelectiveDisciplinesException extends HttpException {
  constructor () {
    super('There are excessive selective disciplines in the request', HttpStatus.BAD_REQUEST);
  }
}