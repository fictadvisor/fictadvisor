import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyActionsException extends HttpException {
  constructor () {
    super('Too many actions. Try later', HttpStatus.TOO_MANY_REQUESTS);
  }
}