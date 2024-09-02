import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityByException extends HttpException {
  constructor (entity: string, by: string) {
    super(`${entity} with such ${by} is not found`, HttpStatus.BAD_REQUEST);
  }
}
