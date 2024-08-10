import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidGoogleTokenException extends HttpException {
  constructor () {
    super('The google id token is invalid', HttpStatus.UNAUTHORIZED);
  }
}
