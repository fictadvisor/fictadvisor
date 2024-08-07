import { HttpException, HttpStatus } from '@nestjs/common';


export class NoGoogleGrantException extends HttpException {
  constructor () {
    super('User has not granted the required Google account permissions', HttpStatus.FORBIDDEN);
  }
}
