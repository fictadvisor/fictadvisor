import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import { resolve } from 'url';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import * as process from 'process';
import { v4 } from 'uuid';
import { find } from '../ArrayUtil';
import { StudentWithContactsData } from '../../api/datas/StudentWithContactsData';
import { MINUTE } from '../date/DateService';

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

  generateGroupList (students: StudentWithContactsData[]) {
    const fileName = `${v4()}.csv`;
    const path = join(__dirname, 'static', 'lists', fileName);

    let result = 'lastName,firstName,middleName,email,telegram,github,instagram,facebook,twitter,discord,youtube,mail';
    for (const student of students) {
      const telegram = find(student.contacts, 'name', 'TELEGRAM')?.link || '';
      const gitHub = find(student.contacts, 'name', 'GITHUB')?.link || '';
      const instagram = find(student.contacts, 'name', 'INSTAGRAM')?.link || '';
      const facebook = find(student.contacts, 'name', 'FACEBOOK')?.link || '';
      const twitter = find(student.contacts, 'name', 'TWITTER')?.link || '';
      const discord = find(student.contacts, 'name', 'DISCORD')?.link || '';
      const youTube = find(student.contacts, 'name', 'YOUTUBE')?.link || '';
      const mail = find(student.contacts, 'name', 'MAIL')?.link || '';
      const contacts = `${telegram},${gitHub},${instagram},${facebook},${twitter},${discord},${youTube},${mail}`;

      result += `\n${student.lastName},${student.firstName},${student.middleName},${student.email},${contacts}`;
    }
    fs.writeFileSync(path, result);

    setTimeout(() => fs.unlinkSync(path), 15*MINUTE);

    return resolve(process.env.BASE_URL, join('lists', fileName));
  }
}
