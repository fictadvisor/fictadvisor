import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadySentGroupRequestException extends HttpException {
  constructor () {
    super('You have already sent request to join this group', HttpStatus.BAD_REQUEST);
  }
}
