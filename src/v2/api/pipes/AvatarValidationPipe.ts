import { Injectable, PipeTransform } from '@nestjs/common';
import { TooLargeSizeException } from '../../utils/exceptions/TooLargeSizeException';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { InvalidExtensionException } from '../../utils/exceptions/InvalidExtensionException';
import { extname } from 'path';

const AVATAR_MAX_SIZE = 1572864;
const AVATAR_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.web'];

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  transform (file: Express.Multer.File) {

    if (!file) throw new DataNotFoundException();

    const ext = extname(file.originalname);

    if (!AVATAR_EXTENSIONS.includes(ext)) {
      throw new InvalidExtensionException();
    }

    if (file.size > AVATAR_MAX_SIZE) {
      throw new TooLargeSizeException('1.5 MB');
    }

    return file;
  }
}
