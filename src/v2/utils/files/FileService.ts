import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import { resolve } from 'url';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import * as process from 'process';

@Injectable()
export class FileService {
  async saveByHash (file: Express.Multer.File, directory: string) {
    const fileName = createHash('md5').update(file.buffer).digest('hex');
    const filePath = join(__dirname, 'static', directory, fileName + extname(file.originalname));

    await fs.promises.writeFile(filePath, file.buffer);

    return resolve(process.env.BASE_URL, join(directory, fileName + extname(file.originalname)));
  }

  getFileContent (path: string, isPrivate = true) {
    const filePath = join(__dirname, isPrivate ? 'private' : 'static', path);
    return fs.readFileSync(filePath, 'utf-8');
  }

  fillTemplate (fileName: string, data: object) {
    const path = join(__dirname, 'private/templates', fileName);
    const zip = new PizZip(fs.readFileSync(path, 'binary'));

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter: () => '',
    });

    doc.render(data);
    return doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
  }
}
