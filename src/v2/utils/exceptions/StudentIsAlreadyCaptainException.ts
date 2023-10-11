import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentIsAlreadyCaptainException extends HttpException {
  constructor () {
    super('The student is already the captain of the group', HttpStatus.BAD_REQUEST);
  }
}