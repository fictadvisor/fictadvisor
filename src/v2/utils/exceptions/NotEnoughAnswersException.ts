import { HttpException, HttpStatus } from '@nestjs/common';

export class NotEnoughAnswersException extends HttpException {
  constructor () {
    super('There are not enough answers', HttpStatus.BAD_REQUEST);
  }
}