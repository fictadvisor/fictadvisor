import { HttpException, HttpStatus } from '@nestjs/common';

export class DataMissingException extends HttpException {
  constructor () {
    super('Data are missing', HttpStatus.BAD_REQUEST);
  }
}
