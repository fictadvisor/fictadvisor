import { HttpException, HttpStatus } from '@nestjs/common';

export class TooLargeSizeException extends HttpException {
  constructor (size: string) {
    super(`The file size exceeds ${size}`, HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
