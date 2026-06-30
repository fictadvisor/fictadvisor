// @types/multer (written for Express 4) does not merge its Express.Multer
// augmentation under @types/express 5, so `Express.Multer.File` resolves to
// nothing. Re-declare the file shape here to restore it across the codebase.
import { Readable } from 'stream';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        stream: Readable;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
  }
}
