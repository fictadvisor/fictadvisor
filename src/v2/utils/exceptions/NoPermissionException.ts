import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPermissionException extends HttpException {
  constructor () {
    super('You do not have permission to perform this action', HttpStatus.FORBIDDEN);
  }
}
