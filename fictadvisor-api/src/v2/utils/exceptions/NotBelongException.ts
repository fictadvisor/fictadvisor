import { HttpException, HttpStatus } from '@nestjs/common';

export class NotBelongException extends HttpException {
  constructor (what: string, where: string) {
    super(`This ${what} does not belong to this ${where}`, HttpStatus.BAD_REQUEST);
  }
}