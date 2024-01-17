import { HttpException, HttpStatus } from '@nestjs/common';

export class CaptainCanNotLeaveException extends HttpException {
  constructor () {
    super('Captain may not leave the group', HttpStatus.FORBIDDEN);
  }
}