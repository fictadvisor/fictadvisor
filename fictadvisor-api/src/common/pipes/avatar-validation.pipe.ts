import { Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import { TooLargeSizeException } from '../exceptions/too-large-size.exception';
import { DataNotFoundException } from '../exceptions/data-not-found.exception';
import { InvalidExtensionException } from '../exceptions/invalid-extension.exception';

const AVATAR_MAX_SIZE = 1048576;
const AVATAR_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  transform (file: Express.Multer.File) {

    if (!file) throw new DataNotFoundException();

    const ext = extname(file.originalname);

    if (!AVATAR_EXTENSIONS.includes(ext)) {
      throw new InvalidExtensionException();
    }

    if (file.size > AVATAR_MAX_SIZE) {
      throw new TooLargeSizeException('1 MB');
    }

    return file;
  }
}
