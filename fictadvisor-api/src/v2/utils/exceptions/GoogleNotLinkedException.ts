import { HttpException, HttpStatus } from '@nestjs/common';

export class GoogleNotLinkedException extends HttpException {
  constructor () {
    super('There is no google account linked to the user', HttpStatus.UNAUTHORIZED);
  }
}
