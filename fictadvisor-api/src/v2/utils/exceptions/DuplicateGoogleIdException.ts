import { HttpException, HttpStatus } from '@nestjs/common';


export class DuplicateGoogleIdException extends HttpException {
  constructor () {
    super('A user with this google id already exists', HttpStatus.CONFLICT);
  }
}
