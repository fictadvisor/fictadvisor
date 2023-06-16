import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidExtensionException extends HttpException {
  constructor () {
    super('File extension is wrong', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
