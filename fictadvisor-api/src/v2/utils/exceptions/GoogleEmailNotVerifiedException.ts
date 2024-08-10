import { HttpException, HttpStatus } from '@nestjs/common';


export class GoogleEmailNotVerifiedException extends HttpException {
  constructor () {
    super('Cannot link google account with unverified email', HttpStatus.FORBIDDEN);
  }
}
