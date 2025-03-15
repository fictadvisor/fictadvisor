import { HttpException, HttpStatus } from '@nestjs/common';

export class DataNotFoundException extends HttpException {
  constructor () {
    super('Data were not found', HttpStatus.BAD_REQUEST);
  }
}
