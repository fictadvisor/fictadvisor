import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as admin from 'firebase-admin';
import * as process from 'process';
import { find } from '../ArrayUtil';
import { StudentWithContactsData } from '../../api/datas/StudentWithContactsData';
import { MINUTE } from '../date/DateService';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FileService {
  private storage: Bucket;

  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      storageBucket: process.env.BUCKET_NAME,
    });
    this.storage = admin.storage().bucket();
  }

  async saveByHash (fileContent: Express.Multer.File, directory: string): Promise<string> {
    const fileName = createHash('md5').update(fileContent.buffer).digest('hex');
    const filePath = join('static', directory, fileName + extname(fileContent.originalname));

    const file = this.storage.file(filePath);
    await file.save(fileContent.buffer);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2222',
    });
    return url;
  }

  private formatLink (path: string): string {
    return path.replaceAll('\\', '/');
  }

  getPathFromLink (link: string): string {
    const url = new URL(link);
    const pathParts = url.pathname.split('/').slice(2);
    return pathParts.join('/');
  }

  async checkFileExist (path: string): Promise<boolean> {
    const [result] = await this.storage.file(path).exists();
    return result;
  }

  async deleteFile (path: string): Promise<void> {
    await this.storage.file(path).delete();
  }

  async getFileContent (path: string, isPrivate = true, encoding: BufferEncoding = 'utf-8') {
    const filePath = this.formatLink(join(isPrivate ? 'private' : 'static', path));
    const [file] = await this.storage.file(filePath).download();

    return file.toString(encoding);
  }

  async fillTemplate (fileName: string, data: object): Promise<Buffer> {
    const file = await this.getFileContent(`templates/${fileName}`, true, 'binary');
    const zip = new PizZip(file);

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

  async generateGroupList (students: StudentWithContactsData[], groupId: string): Promise<string> {
    const fileName = `${groupId}.csv`;
    const path = join('static', 'lists', fileName);

    const timeout = MINUTE * 15;

    const file = this.storage.file(path);
    if (await this.checkFileExist(path)) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + timeout,
      });

      return url;
    }

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
    await file.save(result);

    setTimeout(async () => this.storage.file(path).delete(), timeout);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + timeout,
    });

    return url;
  }
}
