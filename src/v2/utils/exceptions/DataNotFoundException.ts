import { HttpException, HttpStatus } from '@nestjs/common';

export class DataNotFoundException extends HttpException {
  constructor () {
    super('Data was not found', HttpStatus.BAD_REQUEST);
  }
}
