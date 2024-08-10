import { HttpException, HttpStatus } from '@nestjs/common';

export class GoogleAlreadyLinkedException extends HttpException {
  constructor () {
    super('The user already has their google account linked', HttpStatus.FORBIDDEN);
  }
}
