import { HttpException, HttpStatus } from '@nestjs/common';

export class CaptainAlreadyRegisteredException extends HttpException {
  constructor () {
    super('Captain of this group is already registered', HttpStatus.BAD_REQUEST);
  }
}