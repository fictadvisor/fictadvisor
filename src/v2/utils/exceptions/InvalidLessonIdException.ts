import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLessonIdException extends HttpException {
  constructor () {
    super('Lesson with such id is not found', HttpStatus.BAD_REQUEST);
  }
}
