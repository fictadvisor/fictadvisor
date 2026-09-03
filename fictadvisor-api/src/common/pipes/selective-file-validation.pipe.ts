import { Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import { TooLargeSizeException } from '../exceptions/too-large-size.exception';
import { DataNotFoundException } from '../exceptions/data-not-found.exception';
import { InvalidExtensionException } from '../exceptions/invalid-extension.exception';

// A faculty's selectives for one year are a few thousand rows — tens of
// kilobytes. The file is read into memory whole rather than streamed, so the
// cap is what keeps a stray upload from becoming a heap spike.
const SELECTIVE_FILE_MAX_SIZE = 5 * 1024 * 1024;
const SELECTIVE_FILE_EXTENSIONS = ['.csv', '.xlsx', '.xls'];

@Injectable()
export class SelectiveFileValidationPipe implements PipeTransform {
  transform (file: Express.Multer.File) {
    if (!file) throw new DataNotFoundException();

    const ext = extname(file.originalname).toLowerCase();

    if (!SELECTIVE_FILE_EXTENSIONS.includes(ext)) {
      throw new InvalidExtensionException();
    }

    if (file.size > SELECTIVE_FILE_MAX_SIZE) {
      throw new TooLargeSizeException('5 MB');
    }

    return file;
  }
}
