import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityIdException extends HttpException {
  constructor (entity: string) {
    super(`${entity} with such id is not found`, HttpStatus.BAD_REQUEST);
  }
}
